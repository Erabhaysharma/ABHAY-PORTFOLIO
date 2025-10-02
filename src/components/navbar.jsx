import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope, FaMoon, FaSun, FaEllipsisV } from "react-icons/fa";



const Navbar = ({ onThemeToggle, theme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const id = e.target.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 40,
            behavior: 'smooth',
          });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const navigate = useNavigate();

  // Handler for Projects link
  const handleProjectsNav = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/projects");
    }
  };

  return (
    <nav className={`navbar-container${theme === "dark" ? " dark" : ""}`}> 
      {/* Upper Bar */}
      <div className="navbar-upper">
        <div className="navbar-upper-left">
          {/* Desktop: show contact links; Mobile: show ellipsis icon */}
          <div className="navbar-contact-desktop">
            <a href="https://github.com/Erabhaysharma" target="_blank" rel="noopener noreferrer" className="navbar-link small"><FaGithub style={{marginRight:4}}/>Github</a>
            <span className="navbar-divider">|</span>
            <span className="navbar-link small">8571816976</span>
            <span className="navbar-divider">|</span>
            <a href="www.linkedin.com/in/abhay-sharma-4b4816253" target="_blank" rel="noopener noreferrer" className="navbar-link small"><FaLinkedin style={{marginRight:4}}/>LinkedIn</a>
            <span className="navbar-divider">|</span>
            <a href="mailto:abhaysharma75547@gmail.com" className="navbar-link small"><FaEnvelope style={{marginRight:4}}/>Mail</a>
          </div>
          <button className="navbar-contact-mobile" onClick={() => setShowContactMenu(!showContactMenu)} title="Show contacts">
            <FaEllipsisV />
          </button>
          <div className={`navbar-mobile-contact-menu${showContactMenu ? ' active' : ''}`}>
            <a href="https://github.com/Erabhaysharma" target="_blank" rel="noopener noreferrer" className="navbar-link small"><FaGithub style={{marginRight:4}}/>Github</a>
            <span className="navbar-divider">|</span>
            <span className="navbar-link small">8571816976</span>
            <span className="navbar-divider">|</span>
            <a href="www.linkedin.com/in/abhay-sharma-4b4816253" target="_blank" rel="noopener noreferrer" className="navbar-link small"><FaLinkedin style={{marginRight:4}}/>LinkedIn</a>
            <span className="navbar-divider">|</span>
            <a href="mailto:abhaysharma75547@gmail.com" className="navbar-link small"><FaEnvelope style={{marginRight:4}}/>Mail</a>
          </div>
        </div>
        <div className="navbar-upper-right">
          <button className="navbar-signin small"  onClick={() => navigate("/admin-login")}>Sign In</button>
          <button className="navbar-theme-toggle" onClick={onThemeToggle} title="Toggle theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
      {/* Lower Bar */}
      <div className="navbar-lower">
        <div className="navbar-logo">AbHaY</div>
      <div className="navbar-links">
  <Link to="/" className="navbar-link">Home</Link>
  <a href="#about" className="navbar-link">About</a>
  <a href="#skill" className="navbar-link">Skill</a>
  <a href="#projects" className="navbar-link" onClick={handleProjectsNav}>Projects</a>
  <a href="#experience" className="navbar-link">Experience</a>
  <a href="#research" className="navbar-link">Research</a>
  <a href="#contact" className="navbar-link">Contact</a>
      </div>
        {/* Hamburger for mobile */}
        <button className="navbar-hamburger" onClick={() => setShowMenu(!showMenu)}>
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
        </button>
        <div className={`navbar-mobile-menu${showMenu ? ' active' : ''}`}>
          <a href="#skill" className="navbar-link" onClick={()=>setShowMenu(false)}>Skill</a>
          <a href="#about" className="navbar-link" onClick={()=>setShowMenu(false)}>About</a>
          <a href="#contact" className="navbar-link" onClick={()=>setShowMenu(false)}>Contact</a>
          <Link to="/" className="navbar-link" onClick={()=>setShowMenu(false)}>Home</Link>
          <a href="#projects" className="navbar-link" onClick={e => { handleProjectsNav(e); setShowMenu(false); }}>Projects</a>
          <a href="#article" className="navbar-link" onClick={()=>setShowMenu(false)}>Article</a>
          <a href="#research" className="navbar-link" onClick={()=>setShowMenu(false)}>Research</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
