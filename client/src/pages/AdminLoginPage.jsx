import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                "https://codestrom-production.up.railway.app/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();

            if (data.success) {
                navigate("/admin-dashboard");
            } else {
                setError("Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Server connection failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
