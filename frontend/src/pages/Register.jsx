import { useState } from "react";
import { registerUser } from "../api/auth.js";

export default function Register({ onRegister }) {
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
            localStorage.setItem("token", token);
            onRegister(user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                Register
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <button className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700">
                    Register
                </button>
            </form>
        </div>
    );
}
