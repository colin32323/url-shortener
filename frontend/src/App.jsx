import { useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
    // Track current page: 'home', 'login', 'register'
    const [page, setPage] = useState("home");
    const [user, setUser] = useState(localStorage.getItem("username") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Handle login
    const handleLogin = (username, authToken) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", authToken);
        setUser(username);
        setToken(authToken);
        setPage("home");
    };

    // Handle registration
    const handleRegister = (username, authToken) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", authToken);
        setUser(username);
        setToken(authToken);
        setPage("home");
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    // Page rendering
    if (page === "login") {
        return (
            <Login
                onLogin={handleLogin}
                switchToRegister={() => setPage("register")}
            />
        );
    }

    if (page === "register") {
        return (
            <Register
                onRegister={handleRegister}
                switchToLogin={() => setPage("login")}
            />
        );
    }

    // Home page (default)
    return (
        <Home
            username={user}
            token={token}
            onLogout={handleLogout}
            onLoginClick={() => setPage("login")}
            onRegisterClick={() => setPage("register")}
        />
    );
}
