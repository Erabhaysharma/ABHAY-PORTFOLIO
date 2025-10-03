import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../style/projects.css";
import { getProjects } from "../api"; // <-- use your API functions

const dotActive = { background: "#0a66c2" };
const dotInactive = { background: "#e3e6ea07" };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef();

  // ---- Fetch projects from backend ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data); // save projects in state
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchData();
  }, []);

  const total = projects.length;
  const prev = () => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    setShowFull(false);
  };
  const next = () => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    setShowFull(false);
  };

  // ---- Auto-scroll effect ----
  useEffect(() => {
    if (isPaused || total === 0) return;
    autoPlayRef.current = setInterval(() => {
      setCurrent((c) => (c === total - 1 ? 0 : c + 1));
      setShowFull(false);
    }, 3000);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, total]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  if (total === 0) {
    return (
      <section className="projects-page-root" id="projects">
        <h2 className="projects-title">Projects</h2>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Loading projects...
        </div>
      </section>
    );
  }

  const project = projects[current];

  // Responsive: show less text on mobile
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 700;
  const descLimit = isMobile ? 90 : 180;
  const desc = project.description || "";
  const shouldTruncate = desc.length > descLimit;
  const displayDesc =
    !shouldTruncate || showFull
      ? desc
      : desc.slice(0, descLimit) + "...";

  return (
    <section className="projects-page-root" id="projects">
      <div style={{ marginBottom: "0.5rem" }}>
        <h2 className="projects-title">Projects</h2>
        <div className="projects-subtitle">
          My independent projects & contributions
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          position: "relative",
          minHeight: 320,
        }}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {/* Card */}
        <div
          className="project-card"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            width: "100%",
            maxWidth: 700,
            minHeight: 260,
            boxShadow: "0 2px 12px rgba(10,102,194,0.07)",
            padding: 0,
            position: "relative",
          }}
        >
          {/* Left Arrow */}
          <button
            aria-label="Previous project"
            onClick={prev}
            className="project-arrow-btn left"
          >
            <FiChevronLeft />
          </button>

          {/* Image */}
          <div
            style={{
              flex: "0 0 44%",
              minWidth: 180,
              maxWidth: 300,
              borderRadius: "12px 0 0 12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "stretch",
              background: "#de233909",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px 0 0 12px",
                display: "block",
              }}
            />
          </div>

          {/* Details */}
          <div
            style={{
              flex: 1,
              padding: "1.5rem 1.5rem 1.2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              className="project-card-title"
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#181818",
              }}
            >
              {project.title}
            </h3>
            <p
              className="project-card-desc"
              style={{
                margin: "0.7rem 0 0.7rem 0",
                color: "#222",
                fontSize: "1.13rem",
                fontWeight: 500,
              }}
            >
              {displayDesc}
              {shouldTruncate && (
                <button
                  className="project-readmore-btn"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0a66c2",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1em",
                    marginLeft: 4,
                    padding: 0,
                  }}
                  onClick={() => setShowFull((f) => !f)}
                >
                  {showFull ? "Show Less" : "Read More"}
                </button>
              )}
            </p>

            <div
              className="project-card-stack"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {project.stack &&
                project.stack.map((tech, i) => (
                  <span
                    className="project-card-tech"
                    key={i}
                    style={{
                      background: "#eaf1fb04",
                      color: "#0a66c2",
                      fontWeight: 600,
                      borderRadius: 7,
                      padding: "3px 13px",
                      fontSize: "1.01rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
            </div>

            <div style={{ marginTop: 10 }}>
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                style={{
                  display: "inline-block",
                  background: "#0a66c2",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 7,
                  padding: "7px 22px",
                  fontSize: "1.05rem",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(10,102,194,0.08)",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                View
              </a>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          aria-label="Next project"
          onClick={next}
          className="project-arrow-btn right"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Pagination dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
          gap: 8,
        }}
      >
        {projects.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 11,
              height: 11,
              borderRadius: "50%",
              margin: "0 2px",
              transition: "background 0.2s",
              boxShadow:
                idx === current ? "0 1px 4px #0a66c2" : "none",
              ...(idx === current ? dotActive : dotInactive),
            }}
          />
        ))}
      </div>
    </section>
  );
}
