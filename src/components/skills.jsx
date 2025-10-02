import React, { useState, useEffect } from "react";
import {
  FaBrain,
  FaCode,
  FaPalette,
  FaServer,
  FaCloud,
  FaCogs,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "../../public/style/skill.css";
import { getSkills } from "../api"; 

const iconMap = {
  FaBrain: <FaBrain />,
  FaCode: <FaCode />,
  FaPalette: <FaPalette />,
  FaServer: <FaServer />,
  FaCloud: <FaCloud />,
  FaCogs: <FaCogs />,
};

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState([]);

 useEffect(() => {
  const fetchSkills = async () => {
    try {
      const res = await getSkills(); // Axios returns { data, status, ... }
      const data = res.data; // extract actual data

      const mapped = data.map((cat) => ({
        ...cat,
        icon: iconMap[cat.icon] || null,
      }));

      setCategories(mapped);
      setOpen(Array(mapped.length).fill(false));
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  fetchSkills();
}, []);


  const handleAccordion = (idx) => {
    setOpen((open) => open.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <section className="modern-skills-section dark-skill-section">
      <h2 className="modern-skills-heading dark-skill-heading">Skills Proficiency</h2>
      <div className="modern-skills-subtitle dark-skill-subtitle">
        My technical &amp; other skills.
      </div>
      <div className="modern-skills-grid responsive-skills-grid">
        {categories.map((cat, idx) => (
          <div
            className="modern-skill-category dark-skill-category"
            key={cat.name}
          >
            {/* Accordion header */}
            <button
              className="modern-skill-accordion dark-skill-accordion"
              onClick={() => handleAccordion(idx)}
            >
              <span className="modern-skill-icon dark-skill-icon">{cat.icon}</span>
              <span className="modern-skill-cat-title dark-skill-cat-title">
                {cat.name}
              </span>
              <span className="modern-skill-arrow dark-skill-arrow">
                {open[idx] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {/* Accordion content */}
            <div
              className={`modern-skill-panel dark-skill-panel${
                open[idx] ? " open" : ""
              }`}
              style={{ maxHeight: open[idx] ? cat.skills.length * 56 + 24 : 0 }}
            >
              {cat.skills.map((skill) => (
                <div
                  className="modern-skill-row dark-skill-row"
                  key={skill.name}
                >
                  <div className="modern-skill-label dark-skill-label">
                    {skill.name}
                  </div>
                  <div className="modern-skill-bar-bg dark-skill-bar-bg">
                    <div
                      className="modern-skill-bar-fill dark-skill-bar-fill gimini-bar"
                      style={{ width: open[idx] ? skill.percent + "%" : 0 }}
                    >
                      <span className="modern-skill-bar-percent dark-skill-bar-percent">
                        {skill.percent}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
