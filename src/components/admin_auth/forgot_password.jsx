import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ Import navigate
import { sendForgotPasswordOTP } from "../../api";

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
  message: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#bbb",
  },
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();   // ✅ initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendForgotPasswordOTP(email);
      console.log("✅ Backend Success Response:", res.data);

      setMessage(res.data?.message || "OTP sent successfully. Check your email.");

      // ✅ navigate after small delay
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1000);

    } catch (err) {
      console.error("❌ Backend Error Response:", err.response?.data || err);
      setMessage(err.response?.data?.detail || "Error sending OTP");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Send OTP</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}
