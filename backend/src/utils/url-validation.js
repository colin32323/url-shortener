import { parse } from "dotenv";

export function isValidUrl(url) {
    try {
        const normalizedUrl = url.match(/^https?:\/\//)
            ? url
            : `https://${url}`;

        const parsedUrl = new URL(normalizedUrl);

        // Check if the url contains "."
        if (!parsedUrl.hostname.includes(".")) return false;

        return true;
    } catch {
        return false;
    }
}
