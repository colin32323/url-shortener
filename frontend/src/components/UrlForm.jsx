import { useState } from "react";

export default function UrlForm({ onShorten }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        try {
            await onShorten(url); // ✅ calls Home handler
            setUrl("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="url"
                placeholder="Enter a long URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                disabled={loading}
            >
                {loading ? "..." : "Shorten"}
            </button>
        </form>
    );
}
