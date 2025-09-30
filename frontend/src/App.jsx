import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import UrlPage from "./pages/UrlPage.jsx";
import Register from "./pages/Register.jsx";

// Wrapper component to allow useNavigate
function AppRoutes() {
    const [user, setUser] = useState(localStorage.getItem("username") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    const handleLogin = (username, authToken) => {
        setUser(username);
        setToken(authToken);
        localStorage.setItem("username", username);
        localStorage.setItem("token", authToken);
        navigate("/urls"); // optional: auto-redirect after login
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/"); // redirect to login page
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home username={user} token={token} onLogin={handleLogin} />
                }
            />
            <Route
                path="/register"
                element={
                    <Register
                        onRegister={() => {
                            navigate("/");
                        }}
                    />
                }
            />
            <Route
                path="/urls"
                element={
                    <UrlPage
                        username={user}
                        token={token}
                        onLogout={handleLogout}
                    />
                }
            />
        </Routes>
    );
}

export default function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
