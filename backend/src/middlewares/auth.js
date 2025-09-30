import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { throwError, ERROR_CODES, AppError } from "../utils/error-codes.js";

export async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throwError(ERROR_CODES.AUTH.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).lean();
        if (!user) throwError(ERROR_CODES.AUTH.UNAUTHORIZED);

        req.user = user;
        next();
    } catch (err) {
        if (err instanceof AppError) throw err;
        throwError(ERROR_CODES.AUTH.UNAUTHORIZED, {
            details: err.message,
        });
    }
}
