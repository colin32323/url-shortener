import { useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
    const [user, setUser] = useState(
        localStorage.getItem("token") ? "User" : null
    );
    const [showLogin, setShowLogin] = useState(!user);

    const handleLogin = (username) => setUser(username);
    const handleRegister = (username) => setUser(username);

    if (!user) {
        return showLogin ? (
            <Login onLogin={handleLogin} />
        ) : (
            <Register onRegister={handleRegister} />
        );
    }

    return <Home username={user} />;
}
