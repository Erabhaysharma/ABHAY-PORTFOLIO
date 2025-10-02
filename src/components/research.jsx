import React, { useEffect, useState } from "react";
import "../../public/style/research.css";
import { getResearch } from "../api"; // <-- import API call

export default function Research() {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch research from backend
  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const { data } = await getResearch();
        setResearchList(data);
      } catch (err) {
        console.error("Error fetching research:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  return (
    <section className="research-section-root" id="research">
      <h2 className="research-title">Research</h2>
      <div className="research-subtitle">
        My published & independent research projects
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Loading research...
        </div>
      ) : researchList.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          No research available
        </div>
      ) : (
        <div className="research-list">
          {researchList.map((item, idx) => (
            <div className="research-item" key={idx}>
              <h3 className="research-item-title">{item.title}</h3>
              <div className="research-item-meta">
                <span className="research-item-authors">{item.author}</span>
                {item.link && (
                  <>
                    {" | "}
                    <a
                      href={item.link}
                      className="research-item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Paper
                    </a>
                  </>
                )}
              </div>
              <div className="research-item-desc">
                {item.short_description}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
