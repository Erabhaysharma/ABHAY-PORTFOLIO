
import React, { useState } from "react";
import styles from "./admin.module.css";
import { FiGrid, FiBookOpen, FiFolder, FiBriefcase, FiAward, FiClipboard, FiUser, FiLogOut } from "react-icons/fi";
import EditProjects from "../components/editprojects";
import EditSkill from "../components/editskill";
import EditExprience from "../components/editexprience";
import EditResearch from "../components/editresearch";
import Dashbord from "../components/dashbord";

const SIDEBAR_MENU = [
  { label: "Dashboard", icon: <FiGrid />, key: "dashboard", bold: true },
  { label: "Research", icon: <FiBookOpen />, key: "research" },
  { label: "Projects", icon: <FiFolder />, key: "projects" },
  { label: "Experience", icon: <FiBriefcase />, key: "experience" },
  { label: "Skills", icon: <FiAward />, key: "skills" },
  { label: "Work Orders", icon: <FiClipboard />, key: "workorders" },
];

function AdminSidebar({ active, setActive }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Admin</div>
      <nav>
        {SIDEBAR_MENU.map((item) => (
          <div
            key={item.key}
            className={
              `${styles.menuItem} ${active === item.key ? styles.active : ""} ${item.bold ? styles.bold : ""}`
            }
            onClick={() => setActive(item.key)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TopBar({ onLogout }) {
  return (
    <header className={styles.topbar}>
      <div />
      <div className={styles.profile}>
        <FiUser size={22} />
        <button className={styles.logout} onClick={onLogout}>
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}

export default function AdminPage() {
  const [sidebarActive, setSidebarActive] = useState("dashboard");

  const handleLogout = () => {
    // Implement logout logic
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar active={sidebarActive} setActive={setSidebarActive} />
      <div className={styles.mainArea}>
        <TopBar onLogout={handleLogout} />
        <main className={styles.content}>
          {sidebarActive === "dashboard" ? (
            <Dashbord />
          ) : sidebarActive === "projects" ? (
            <EditProjects />
          ) : sidebarActive === "skills" ? (
            <EditSkill />
          ) : sidebarActive === "experience" ? (
            <EditExprience />
          ) : sidebarActive === "research" ? (
            <EditResearch />
          ) : (
            <div style={{ color: "#a1a1aa", fontSize: "1.2rem", padding: "2rem 0" }}>
              <span>{SIDEBAR_MENU.find(m => m.key === sidebarActive)?.label || "Section"} coming soon...</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}