import React from "react";
import "../../public/style/about.css";

const About = () => (
  <section className="about-section">
    <h2 className="about-title">About Me</h2>
    <div className="about-description">
      I’m Abhay Kumar Sharma, an <b>AI/ML Engineer</b> with over <b>2+ years</b> Throughout my journey, I have successfully delivered <b>30+ diverse projects</b> across domains like predictive analytics, recommendation systems, natural language processing, computer vision, and financial market modeling.<br />
      My expertise lies in transforming complex problems into data-driven solutions using  I am equally skilled in data preprocessing, feature engineering, model optimization, and deployment through modern frameworks and cloud platforms.
      Passionate about continuous learning, I thrive on building scalable AI applications that not only solve real-world problems but also create measurable impact for businesses and end-users. My goal is to contribute to innovative projects that push the boundaries of Artificial Intelligence while keeping solutions practical and reliable.
    </div>
    <div className="about-stats">
      <div className="about-stat">
        <span className="about-stat-number">02+</span>
        <span className="about-stat-label">Years XP</span>
      </div>
      <div className="about-stat">
        <span className="about-stat-number">30+</span>
        <span className="about-stat-label">Projects</span>
      </div>
      <div className="about-stat">
        <span className="about-stat-number">10+</span>
        <span className="about-stat-label">Certification</span>
      </div>
    </div>
  </section>
);

export default About;
