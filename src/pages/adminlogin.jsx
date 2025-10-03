import React, { useState } from "react";
import "../style/adminlogin.css"; // adjust path if needed
import { useNavigate } from "react-router-dom"; // For navigation

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation to match FastAPI model
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{1,6}$/;

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must have 1 uppercase, 1 number, 1 symbol, max 6 characters"
      );
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        // Login successful
        localStorage.setItem("isAdmin", "true"); // ✅ save login state
        navigate("/admin"); // redirect to admin page
      } else {
        const data = await res.json();
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email"
            className="admin-login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="admin-login-input"
          />
          <button type="submit" className="admin-login-button">
            Sign In
          </button>
        </form>

        {/* Update Password button */}
        <div style={{ marginTop: "1rem" }}>
          <button
            className="admin-login-forgot"
            onClick={() => navigate("/update-admin-credential")}
          >
            Forgot / Update Password?
          </button>
        </div>

        {/* Back to Home button */}
        <div style={{ marginTop: "1rem" }}>
          <button className="admin-login-forgot" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
