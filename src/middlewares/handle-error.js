// middlewares/handleError.js
import { AppError, ERROR_CODES } from "../utils/error-codes.js";

export function handleError(err, req, res, next) {
    console.error(err); // log full error

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
                path: err.path || req.originalUrl,
                timestamp: err.timestamp,
            },
        });
    }

    // fallback for unknown errors
    res.status(500).json({
        success: false,
        error: {
            code: ERROR_CODES.SERVER.INTERNAL_ERROR.code,
            message: ERROR_CODES.SERVER.INTERNAL_ERROR.message,
            details: err.message || null,
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
        },
    });
}
