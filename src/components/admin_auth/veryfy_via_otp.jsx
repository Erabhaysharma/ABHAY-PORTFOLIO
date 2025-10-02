import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { verifyOTP } from "../../api"; 

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

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.data.message || "OTP verified successfully!");

      // ✅ redirect after success
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (err) {
      setMessage("❌ OTP Mismatch!");
      setShowPopup(true);

      // hide popup automatically after 3 sec
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Verify OTP</h2>
      {showPopup && <div style={styles.popup}>{message}</div>}
      <form onSubmit={handleVerify}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Verify
        </button>
      </form>
    </div>
  );
}
