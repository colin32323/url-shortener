import { registerUser, loginUser } from "../services/auth.service.js";
import { throwError, ERROR_CODES } from "../utils/error-codes.js";

export async function register(req, res) {
    try {
        const { token, username } = await registerUser(req.body);
        res.json({ token, username });
    } catch (err) {
        throwError(ERROR_CODES.AUTH.USER_EXISTS);
    }
}

export async function login(req, res) {
    try {
        const { token, username } = await loginUser(req.body);
        res.json({ token, username });
    } catch (err) {
        throwError(ERROR_CODES.AUTH.INVALID_CREDENTIALS, {
            message: err.message,
        });
    }
}
