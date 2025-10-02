import axios from "axios";
import { authRoutes } from "../routes";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function registerUser(data) {
    const res = await axios.post(`${BACKEND_URL}/${authRoutes.register}`, data);
    return res.data;
}

export async function loginUser(data) {
    const res = await axios.post(`${BACKEND_URL}/${authRoutes.login}`, data);
    return res.data;
}
