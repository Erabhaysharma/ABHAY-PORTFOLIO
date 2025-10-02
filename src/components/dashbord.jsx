import React, { useEffect, useState } from "react";
import { FiFolder, FiBookOpen, FiAward } from "react-icons/fi";
import styles from "./dashbord.module.css";
import { fetchCounts } from "../visual/count"; // import fetchCounts

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function CircularStat({ value, label, icon, color }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.statCard}>
      <div className={styles.circleWrap}>
        <svg width="70" height="70">
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke="#232837"
            strokeWidth="7"
            fill="none"
          />
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke={color}
            strokeWidth="7"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - Math.min(value, 100) / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s" }}
          />
        </svg>
        <div className={styles.iconCircle}>{icon}</div>
        <div className={styles.percent}>{value}</div> {/* Only number now */}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function Dashbord() {
  const [counts, setCounts] = useState({ projects: 0, research: 0, skills: 0 });
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function loadCounts() {
      const result = await fetchCounts(); // fetch from count.js
      setCounts({
        projects: result.totalProjects,
        research: result.totalResearch,
        skills: result.totalSkills,
      });
    }
    loadCounts();
    setGreeting(getGreeting());
  }, []);

  return (
    <div className={styles.dashWrap}>
      <div className={styles.statsRow}>
        <CircularStat
  value={counts.projects}  // Use actual count
  label={`Projects`}
  icon={<FiFolder size={24} />}
  color="#5eead4"
/>
<CircularStat
  value={counts.research}  // Use actual count
  label={`Research`}
  icon={<FiBookOpen size={24} />}
  color="#a78bfa"
/>
<CircularStat
  value={counts.skills}  // Use actual count
  label={`Skills`}
  icon={<FiAward size={24} />}
  color="#f472b6"
/>

      </div>
      <div className={styles.welcomeCard}>
        <h2>{greeting}, Abhay!</h2>
        <p>Welcome to your admin dashboard. Here you can manage your projects, research, skills, and more.</p>
      </div>
    </div>
  );
}
