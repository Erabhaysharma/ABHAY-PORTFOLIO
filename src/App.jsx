import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Update_password from "./components/admin_auth/update_login_crendential.jsx"; 
import ProjectsPage from "./pages/projects"; 
import Admin from "./pages/admin.jsx";
import AdminLogin from "./pages/adminlogin.jsx"; 
import ForgotPassword from "./components/admin_auth/forgot_password.jsx";
import VerifyOtp from "./components/admin_auth/veryfy_via_otp.jsx";
import ResetPassword from "./components/admin_auth/reset_password_otp.jsx";

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="dark">  {/* ✅ Always dark theme */}
      {location.pathname !== "/admin" &&
       location.pathname !== "/admin-login" &&
       location.pathname !== "/update-admin-credential" && 
       location.pathname !== "/forgot-password" &&
       location.pathname !== "/reset-password" &&
       location.pathname !== "/verify-otp" && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/update-admin-credential"
          element={
            <ProtectedRoute>
              <Update_password />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Forgot Password Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
