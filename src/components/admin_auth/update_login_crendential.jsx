import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAdminCredential } from "../../api"; // ✅ connect to api.js

export default function UpdateLoginCredential() {
  const navigate = useNavigate();
  const [oldUsername, setOldUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    // ---- Frontend validation ----
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{1,6}$/;

    if (!oldUsername || !oldPassword || !newUsername || !newPassword) {
      setError("Please fill all fields");
      setSuccess("");
      return;
    }
    if (!emailRegex.test(oldUsername) || !emailRegex.test(newUsername)) {
      setError("Please enter valid email addresses");
      setSuccess("");
      return;
    }
    if (!passwordRegex.test(oldPassword) || !passwordRegex.test(newPassword)) {
      setError(
        "Password must have 1 uppercase, 1 number, 1 symbol, max 6 characters"
      );
      setSuccess("");
      return;
    }

    try {
      // ---- Call backend API ----
      const res = await updateAdminCredential(
        oldUsername,
        oldPassword,
        newUsername,
        newPassword
      );

      setError("");
      setSuccess(res.data.message || "Credentials updated successfully!");
      localStorage.removeItem("isAdmin"); // force re-login
      setTimeout(() => navigate("/admin-login"), 2000);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Server error. Please try again.";
      setError(errMsg);
      setSuccess("");
    }
  };

  // ---- Styles ----
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f141b",
    color: "white",
    fontFamily: "Arial, sans-serif",
  };
  const cardStyle = {
    backgroundColor: "#1a1f29",
    padding: "2rem",
    borderRadius: "1.5rem",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
  };
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    marginBottom: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #444",
    backgroundColor: "#0f141b",
    color: "white",
  };
  const buttonStyle = {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  };
  const primaryButton = { ...buttonStyle, backgroundColor: "#00f7ff", color: "black" };
  const linkButton = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: "#00f7ff",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  };
  const messageStyle = { padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "1rem", fontSize: "0.875rem" };
  const errorStyle = { ...messageStyle, backgroundColor: "#e11b1b", color: "white" };
  const successStyle = { ...messageStyle, backgroundColor: "#1b5e20", color: "white" };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "1.5rem" }}>Update Login Credential</h2>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Old Username (Email)"
            value={oldUsername}
            onChange={(e) => setOldUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="New Username (Email)"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={primaryButton}>
            Update Credentials
          </button>
        </form>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <button style={linkButton} onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button style={linkButton} onClick={() => navigate("/admin-login")}>
            Back to Sign In
          </button>
          <button style={linkButton} onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
