import {
    shortenUrl,
    getOriginalUrl,
    getUserUrls,
    deleteUrl,
} from "../services/url.service.js";
import { throwError, ERROR_CODES, AppError } from "../utils/error-codes.js";

export async function createShortUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            throwError(ERROR_CODES.URL.INVALID_URL, {
                message: "You must provide a valid URL",
                details: { received: originalUrl },
            });
        }

        const url = await shortenUrl(originalUrl, req.user._id);
        res.json({ shortCode: url.shortCode, originalUrl: url.originalUrl });
    } catch (err) {
        if (err instanceof AppError) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function redirectToOriginal(req, res) {
    try {
        const { code } = req.params;
        const originalUrl = await getOriginalUrl(code);
        res.redirect(originalUrl);
    } catch (err) {
        if (err instanceof AppError) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function listUserUrls(req, res) {
    try {
        const urls = await getUserUrls(req.user._id);
        res.json(urls);
    } catch (err) {
        if (err instanceof AppError) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function deleteUserUrl(req, res) {
    try {
        const { code } = req.params;
        const userId = req.user._id;

        const url = await deleteUrl(code, userId);
        res.json({ url });
    } catch (error) {
        if (err instanceof AppError) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}
