import React, { useState } from "react";
import "../style/adminlogin.css";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api"; // import axios login

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await adminLogin(username, password);

      if (res.status === 200) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.detail || "Server error. Please try again later.");
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

        <div style={{ marginTop: "1rem" }}>
          <button
            className="admin-login-forgot"
            onClick={() => navigate("/update-admin-credential")}
          >
            Forgot / Update Password?
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button className="admin-login-forgot" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
