import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { throwError, ERROR_CODES } from "../utils/error-codes.js";

export async function registerUser({ name, username, email, password }) {
    try {
        const user = new User({ name, username, email, password });
        await user.save();

        return {
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }),
            username: user.username,
        };
    } catch (err) {
        if (err.code) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, { details: err.message });
    }
}

export async function loginUser({ identifier, password }) {
    try {
        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user || !(await user.comparePassword(password))) {
            throwError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        }

        return {
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }),
            username: user.username,
        };
    } catch (err) {
        if (err.code) throw err;
        throwError(ERROR_CODES.SERVER.INTERNAL_ERROR, {
            details: err.message,
        });
    }
}
