import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth.js";

export default function Register({ onRegister, switchToLogin }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const { token, username: user } = await registerUser({
                name: name.trim(),
                username: username.trim(),
                email: email.trim(),
                password,
            });
            onRegister();
        } catch (err) {
            setError(
                err.response?.data?.error?.message ||
                    err?.message ||
                    "Something went wrong, please try again"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Register
                </h2>

                {error && (
                    <p className="text-red-200 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button
                        className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-center text-white text-lg">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-yellow-200 cursor-pointer hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
