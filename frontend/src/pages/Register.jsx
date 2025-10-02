import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth.js";

export default function Register({ onRegister }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    // Field validation
    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "name":
                if (!value.trim()) error = "Full Name is required";
                else if (!/^[a-zA-Z\s]+$/.test(value))
                    error = "Full Name can only contain letters and spaces";
                break;

            case "username":
                if (!value.trim()) error = "Username is required";
                else if (!/^[a-zA-Z0-9]{3,}$/.test(value))
                    error =
                        "Username must be at least 3 characters and alphanumeric";
                break;

            case "email":
                if (!value.trim()) error = "Email is required";
                else if (!/^\S+@\S+\.\S+$/.test(value))
                    error = "Email is not valid";
                break;

            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 6)
                    error = "Password must be at least 6 characters";
                else if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
                    error =
                        "Password must contain at least one letter and one number";
                break;

            case "confirmPassword":
                if (value !== password) error = "Passwords do not match";
                break;

            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    // Check if form is valid
    const isFormValid =
        name &&
        username &&
        email &&
        password &&
        confirmPassword &&
        !errors.name &&
        !errors.username &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        validateField("name", name);
        validateField("username", username);
        validateField("email", email);
        validateField("password", password);
        validateField("confirmPassword", confirmPassword);

        if (!isFormValid) return;

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
            const message =
                err.response?.data?.error?.message ||
                err?.message ||
                "Something went wrong, please try again";

            setErrors((prev) => ({ ...prev, form: message }));
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

                {errors.form && (
                    <p className="text-red-200 mb-4 text-center">
                        {errors.form}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => validateField("name", name)}
                            className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        {errors.name && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={() => validateField("username", username)}
                            className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        {errors.username && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validateField("email", email)}
                            className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        {errors.email && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validateField("password", password)}
                            className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        {errors.password && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() =>
                                validateField(
                                    "confirmPassword",
                                    confirmPassword
                                )
                            }
                            className="w-full p-3 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition disabled:opacity-50"
                        disabled={!isFormValid || loading}
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
