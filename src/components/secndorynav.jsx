import React from "react";
import { FaDownload } from "react-icons/fa";


const options = [
  { label: "Personal Info", anchor: "#personal-info" },
  { label: "Skills", anchor: "#skills" },
  { label: "Projects", anchor: "#projects" },
  { label: "Experience", anchor: "#experience" },
  { label: "Certification", anchor: "#certification" },
];


const SecndoryNav = ({ active, onSelect }) => {
  return (
    <nav className="cv-secondary-nav">
      <div className="cv-secondary-nav-links">
        {options.map((opt, idx) => (
          <a
            key={opt.label}
            href={opt.anchor}
            className={`cv-secondary-nav-link${active === idx ? " active" : ""}`}
            onClick={e => {
              if (onSelect) onSelect(idx);
            }}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SecndoryNav;
