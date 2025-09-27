import { useState } from "react";
import { registerUser } from "../api/auth.js";

export default function Register({ onRegister, switchToLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, username: user } = await registerUser({
                username,
                password,
            });
            onRegister(user, token); // pass both username and token to App
        } catch (err) {
            setError(err.message);
        }
    };

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
                    Register
                </h2>

                {error && (
                    <p className="text-red-200 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition">
                        Register
                    </button>
                </form>

                <p className="mt-6 text-center text-white text-lg">
                    Already have an account?{" "}
                    <span
                        className="text-yellow-200 cursor-pointer hover:underline"
                        onClick={switchToLogin}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}
