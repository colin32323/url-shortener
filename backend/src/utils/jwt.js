import jwt from "jsonwebtoken";

export function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
