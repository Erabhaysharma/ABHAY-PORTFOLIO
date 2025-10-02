import React, { useRef, useEffect, useState } from "react";

import Skills from "./skills";
import About from "./about";
import Projects from "./projects";
import Research from "./research";
import Experience from "./exprice";
import Contact from "./contact";
import Footer from "./footer";

import mlImg from '../assets/ml.jpg';
import genaiImg from '../assets/genai.jpg';
import wdImg from '../assets/wd.jpg';
import dlImg from '../assets/dl.jpg';
import dsImg from '../assets/ds.jpg';

const skills = [
  {
    name: "Machine Learning",
    img: mlImg
  },
  {
    name: "Generative AI",
    img: genaiImg
  },
  {
    name: "Web Development",
    img: wdImg
  },
  {
    name: "Deep Learning",
    img: dlImg
  },
  {
    name: "Data Analytic",
    img: dsImg
  },
  {
    name: "Computer Vision",
    img: mlImg // Placeholder, replace with your own asset if available
  },
  {
    name: "Artificial Intelligence",
    img: genaiImg // Placeholder, replace with your own asset if available
  },
  {
    name: "AI Integrated Webapp",
    img: wdImg // Placeholder, replace with your own asset if available
  }
];

const Section2 = () => {
  const headingRef = useRef(null);
  const [showHeading, setShowHeading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setShowHeading(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Faster scroll effect
  useEffect(() => {
    if (!showHeading) return;
    const interval = setInterval(() => {
      setOffset(prev => (prev + 4) % (skills.length * 340)); // 20px per tick, even faster
    }, 14); // same interval, much faster movement
    return () => clearInterval(interval);
  }, [showHeading]);

  // Duplicate skills for seamless loop
  const allSkills = [...skills, ...skills];

  return (
    <>
      <div id="about"></div>
  <About />
  <Experience />
      <section className="hero-section2-root">
        <div
          ref={headingRef}
          className={`hero-section2-heading${showHeading ? ' popup-animate' : ''}`}
        >
          Here My All Skills
        </div>
        <div className="hero-skill-banner-slider-outer">
          <div
            className="hero-skill-banner-slider hero-skill-banner-slider-slow"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {allSkills.map((skill, i) => (
              <div className="hero-skill-banner-box hero-skill-banner-box-banner" key={i}>
                <img src={skill.img} alt={skill.name} className="hero-skill-banner-img-banner" />
                <div className="hero-skill-banner-title-banner">{skill.name}</div>
                <button className="hero-skill-banner-btn-banner">My Work</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="skill"></div>
  <Skills />
  <Projects />
  <Research />
  <Contact />
  <Footer />
    </>
  );
};

export default Section2;
