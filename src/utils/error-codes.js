// utils/error-codes.js

class AppError extends Error {
    constructor({
        code,
        message,
        statusCode = 500,
        details = null,
        path = null,
    }) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.path = path;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * throwError helper
 * @param {object} errorObj - An error object from ERROR_CODES
 * @param {object} options - optional { message, details, path }
 * @returns AppError instance
 */
function throwError(errorObj, options = {}) {
    if (!errorObj || !errorObj.code) {
        errorObj = ERROR_CODES.SERVER.INTERNAL_ERROR;
    }

    return new AppError({
        code: errorObj.code,
        message: options.message || errorObj.message,
        statusCode: errorObj.statusCode,
        details: options.details || null,
        path: options.path || null,
    });
}

const ERROR_CODES = {
    AUTH: {
        INVALID_CREDENTIALS: {
            code: "AUTH_001",
            message: "Invalid email or password",
            statusCode: 401,
        },
        UNAUTHORIZED: {
            code: "AUTH_002",
            message: "Unauthorized access",
            statusCode: 401,
        },
        USER_EXISTS: {
            code: "AUTH_003",
            message: "User already exists",
            statusCode: 400,
        },
    },
    URL: {
        INVALID_URL: {
            code: "URL_001",
            message: "Invalid URL provided",
            statusCode: 400,
        },
        URL_NOT_FOUND: {
            code: "URL_002",
            message: "URL not found",
            statusCode: 404,
        },
    },
    SERVER: {
        INTERNAL_ERROR: {
            code: "SERVER_001",
            message: "Internal server error",
            statusCode: 500,
        },
    },
};

export { AppError, ERROR_CODES, throwError };
