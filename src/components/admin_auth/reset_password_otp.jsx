import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api"; // ✅ use api.js

const styles = {
  container: {
    backgroundColor: "#1e222b",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
    width: "350px",
    margin: "50px auto",
    textAlign: "center",
    color: "#fff",
    fontFamily: "sans-serif",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#11141a",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#00f7ff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },
  popup: {
    position: "absolute",
    top: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
    animation: "fadeInOut 3s forwards",
    fontSize: "14px",
  },
};

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // email passed from VerifyOTP

  const handleReset = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation for password match
    if (newPass !== confirmPass) {
      setMessage("❌ Passwords do not match!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    try {
      const res = await resetPassword(email, otp, newPass, confirmPass);
      setMessage(res.data.message || "✅ Password reset successfully!");
      setShowPopup(true);

      // ✅ redirect to login after 1.5 sec
      setTimeout(() => navigate("/admin-login"), 1500);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "❌ Invalid OTP or reset failed";
      setMessage(errMsg);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      {showPopup && <div style={styles.popup}>{message}</div>}
      <form onSubmit={handleReset}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP again"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Reset</button>
      </form>
    </div>
  );
}
