import { useState, useEffect } from "react";
import UrlForm from "../components/UrlForm.jsx";
import UrlList from "../components/UrlList.jsx";
import { shortenUrl, listUserUrls } from "../api/url.js";
import { useNavigate } from "react-router-dom";

export default function UrlPage({ username, token, onLogout }) {
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/"); // Redirect to home page if not authenticated
            return;
        }

        async function fetchUrls() {
            try {
                const data = await listUserUrls(token); // pass token
                setUrls(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch URLs.");
            }
        }

        fetchUrls();
    }, [token, navigate]);

    // Handle shortening a new URL
    const handleShorten = async (originalUrl) => {
        setError("");
        try {
            const newUrl = await shortenUrl(originalUrl, token);
            if (urls.length === 0) setIsEditing(false);
            setUrls([...urls, newUrl]);
        } catch (err) {
            console.error(err);
            setError(
                err?.response?.data?.error?.message || "Failed to shorten URL"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <header className="w-full max-w-3xl flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-600">
                    Hello, {username} 👋
                </h1>
                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>

            <div className="w-full max-w-3xl bg-white p-6 rounded-3xl shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Shorten a URL</h2>
                {error && (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                )}
                <UrlForm onShorten={handleShorten} />
            </div>

            <div className="w-full max-w-3xl bg-white p-6 rounded-3xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Your URLs</h2>
                <UrlList
                    urls={urls}
                    setUrls={setUrls}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            </div>
        </div>
    );
}
