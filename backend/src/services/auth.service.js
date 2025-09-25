import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { throwError, ERROR_CODES } from "../utils/error-codes.js";

export async function registerUser({ username, email, password }) {
    try {
        const existing = await User.findOne({ username });
        if (existing) throw throwError(ERROR_CODES.AUTH.USER_EXISTS);

        const user = new User({ username, email, password });
        await user.save();
        return {
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }),
            username: user.username,
        };
    } catch (err) {
        if (err.code) throw err;
        throw throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}

export async function loginUser({ username, password }) {
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            throw throwError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        }
        return {
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }),
            username: user.username,
        };
    } catch (err) {
        if (err.code) throw err;
        throw throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}
