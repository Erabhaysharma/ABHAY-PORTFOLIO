import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Section2 from '../components/heros2';
import Projects from '../components/projects';

function App() {
  const [theme, setTheme] = useState('dark');
  const handleThemeToggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  // Scroll to skills section if hash is #skill
  React.useEffect(() => {
    if (window.location.hash === '#skill') {
      setTimeout(() => {
        const el = document.getElementById('skills-section-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  return (
    <div className={theme}>
      <Navbar onThemeToggle={handleThemeToggle} theme={theme} />
      <Hero />
  {/* Add an anchor and the actual Projects component for projects section scroll */}
  <div id="projects-section" />
  <Projects />
      {/* Add an anchor for skills section scroll */}
      <div id="skills-section-anchor" />
      <Section2 />
    </div>
  );
}

export default App;
