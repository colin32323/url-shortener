import { useState, useEffect } from "react";
import UrlForm from "../components/UrlForm.jsx";
import UrlList from "../components/UrlList.jsx";
import { shortenUrl, listUserUrls } from "../api/url.js";

export default function Home({
    username,
    token,
    onLogout,
    onLoginClick,
    onRegisterClick,
}) {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        if (!username) return; // Only fetch URLs if logged in

        async function fetchUrls() {
            try {
                const data = await listUserUrls(token); // pass token if needed
                setUrls(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUrls();
    }, [username, token]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            {/* Background designs */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            </div>

            {/* Center box */}
            <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Welcome
                </h2>

                <div className="flex flex-col items-center gap-6">
                    <button
                        className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition"
                        onClick={onLoginClick}
                    >
                        Login
                    </button>

                    <p className="text-white text-lg">
                        Don't have an account?{" "}
                        <span
                            className="text-yellow-200 cursor-pointer hover:underline"
                            onClick={onRegisterClick}
                        >
                            Register here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
