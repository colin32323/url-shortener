const BACKEND_URL = import.meta.env.VITE_API_URL || "http://backend:3000";

export async function registerUser(data) {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

export async function loginUser(data) {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}
