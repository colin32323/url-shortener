import Url from "../models/url-model.js";
import User from "../models/user-model.js";
import generateShortCode from "../utils/generate-shortcode.js";
import redisClient from "../config/redis-client.js";
import { throwError, ERROR_CODES, AppError } from "../utils/error-codes.js";
import { isValidUrl } from "../utils/url-validation.js";

export async function shortenUrl(originalUrl, userId) {
    try {
        if (!isValidUrl(originalUrl)) {
            throwError(ERROR_CODES.URL.INVALID_URL, {
                message: "Invalid URL format",
            });
        }

        let url = await Url.findOne({ originalUrl, user: userId });
        if (url) return url;

        const shortCode = generateShortCode();
        url = new Url({ originalUrl, shortCode, user: userId });
        await url.save();

        await User.findByIdAndUpdate(userId, {
            $push: { urls: shortCode },
        });

        return url;
    } catch (err) {
        if (err instanceof AppError) throw err; // Already an AppError, just rethrow
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function getOriginalUrl(shortCode) {
    try {
        const cachedUrl = await redisClient.get(shortCode);
        if (cachedUrl) return cachedUrl;

        const url = await Url.findOne({ shortCode });
        if (!url) throwError(ERROR_CODES.URL.URL_NOT_FOUND);

        await redisClient.setEx(shortCode, 3600, url.originalUrl);
        return url.originalUrl;
    } catch (err) {
        if (err.code) throw err; // Already AppError
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function getUserUrls(userId) {
    try {
        return await Url.find({ user: userId });
    } catch (err) {
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}
