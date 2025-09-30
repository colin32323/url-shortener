import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://backend:3000";

export async function registerUser(data) {
    const res = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, data);
    return res.data;
}

export async function loginUser(data) {
    const res = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, data);
    return res.data;
}
