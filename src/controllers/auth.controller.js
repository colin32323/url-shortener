import { registerUser, loginUser } from "../services/auth.service.js";
import { throwError, ERROR_CODES } from "../utils/error-codes.js";

export async function register(req, res) {
    try {
        const token = await registerUser(req.body);
        res.json({ token });
    } catch (err) {
        throw throwError(ERROR_CODES.AUTH.USER_EXISTS, {
            message: err.message,
        });
    }
}

export async function login(req, res) {
    try {
        const token = await loginUser(req.body);
        res.json({ token });
    } catch (err) {
        throw throwError(ERROR_CODES.AUTH.INVALID_CREDENTIALS, {
            message: err.message,
        });
    }
}
