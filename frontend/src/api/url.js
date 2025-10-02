import { urlRoutes } from "../routes.js";

const BACKEND_URL = import.meta.env?.VITE_API_URL || "http://localhost:3000";

function getAuthHeader() {
    return {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
}

export async function shortenUrl(originalUrl) {
    const res = await fetch(`${BACKEND_URL}/${urlRoutes.shortenUrl}`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ originalUrl }),
    });
    if (!res.ok) throw new Error("Failed to shorten URL");
    return res.json();
}

export async function listUserUrls() {
    const res = await fetch(`${BACKEND_URL}/${urlRoutes.listUrls}`, {
        method: "GET",
        headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch URLs");
    return res.json();
}

export async function checkUrl(shortCode) {
    const res = await fetch(
        `${BACKEND_URL}/${urlRoutes.redirectUrl(shortCode)}`
    );
    if (!res.ok) throw new Error("URL not valid");
    return res.json();
}

export async function deleteUrl(shortCode) {
    const res = await fetch(
        `${BACKEND_URL}/${urlRoutes.deleteUrl(shortCode)}`,
        {
            method: "DELETE",
            headers: getAuthHeader(),
        }
    );
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error?.message || "Failed to delete URL");
    }
    return res.json();
}
