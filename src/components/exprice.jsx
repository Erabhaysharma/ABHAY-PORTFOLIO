import React, { useState, useEffect } from "react";
import "../style/exprence.css";
import { FaGraduationCap, FaBriefcase, FaRegCalendarAlt } from "react-icons/fa";
import { getExperience } from "../api"; // <-- use your API

const TABS = [
  { key: "Academic", label: "Academic", icon: <FaGraduationCap /> },
  { key: "Professional", label: "Professional", icon: <FaBriefcase /> },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState("Academic");
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch experience from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getExperience();
        // assuming API returns { experience: [...] }
        setExperienceList(data.experience || data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const items = experienceList.filter((e) => e.type === activeTab);

  return (
    <section className="exp-section-root" id="experience">
      <h2 className="exp-title">Experience</h2>
      <div className="exp-subtitle">
        My journey in the academic & professional front
      </div>

      {/* Tabs */}
      <div className="exp-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`exp-tab${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
            aria-label={tab.label}
          >
            <span className="exp-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Loading experience...
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          No {activeTab} experience available
        </div>
      ) : (
        <div className="exp-timeline-root">
          <div className="exp-timeline-line" />
          <div className="exp-timeline-list">
            {items.map((item, idx) => (
              <div
                className={`exp-timeline-item${
                  idx % 2 === 0 ? " left" : " right"
                }`}
                key={idx}
              >
                <div className="exp-timeline-marker" />
                <div className="exp-timeline-content">
                  <div className="exp-role">{item.role}</div>
                  <div className="exp-company">{item.company}</div>
                  <div className="exp-duration">
                    <FaRegCalendarAlt className="exp-calendar-icon" />
                    {item.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
