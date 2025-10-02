// Square bubble background animation (reuse from projects)
const NUM_BUBBLES = 18;
function BubbleBackground() {
    const bubbles = Array.from({ length: NUM_BUBBLES }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 24 + Math.random() * 36;
        const duration = 4 + Math.random() * 5;
        const delay = Math.random() * 5;
        const opacity = 0.13 + Math.random() * 0.18;
        return (
            <div
                key={i}
                className="bubble-square"
                style={{
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    opacity,
                }}
            />
        );
    });
    return <div className="bubble-bg">{bubbles}</div>;
}


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import Section2 from './heros2';


const quotes = [
    "Transforming ideas into intelligent Web & AI solutions.",
    "Where creativity meets technology.",
    "Building smart, scalable, and future-ready applications.",
    "Innovating the web, one solution at a time.",
    "Turning complexity into simplicity through code.",
    "Designing experiences, not just applications.",
    "Smart solutions with a human touch.",
    "Web & AI crafted with passion and precision."
];


const Hero = () => {
    const [quoteIdx, setQuoteIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIdx(idx => (idx + 1) % quotes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();
    const handleWorks = () => navigate("/projects");
        const handleContact = () => {
            // Try to scroll to the contact section by id 'contact'
            const el = document.getElementById("contact");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If not found, navigate to home and scroll after render
                navigate("/#contact");
                setTimeout(() => {
                    const el2 = document.getElementById("contact");
                    if (el2) el2.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        };

    return (
        <div className="hero-root">
          <BubbleBackground />
            {/* Top Section */}
            <div className="hero-top">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h1 className="hero-title hero-title-gradient1" style={{ fontWeight: 800, fontSize: '3.5rem', marginBottom: '2.2rem', letterSpacing: 2, textAlign: 'center' }}>
                        Welcome...
                    </h1>
                    <div className="hero-title-gradient2" style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '0.7rem', textAlign: 'center' }}>
                        Hi, I am Abhay Kumar Sharma on a mission to...
                    </div>
                    <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: '2.2rem', color: '#444', textAlign: 'center', maxWidth: 700 }}>
                        Build excellence for you
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div className="hero-btn-row hero-btn-row-centered">
                        <button className="hero-btn works hero-btn-lg" onClick={handleWorks}>My Works</button>
                        <button className="hero-btn hire hero-btn-lg" onClick={handleContact}>Contact</button>
                    </div>
                </div>
            </div>
                        {/* Animated Quotes Marquee Section */}
                        <div className="hero-quotes-marquee-outer">
                                <div className="hero-quotes-marquee">
                                    {[
                                        "AI is the new electricity.",
                                        "Dream big, build bigger.",
                                        "Code. Create. Innovate.",
                                        "Data is the new oil.",
                                        "Think algorithmically.",
                                        "From idea to impact.",
                                        "Machine learning, human thinking.",
                                        "Automate the future.",
                                        "Simplicity is the ultimate sophistication.",
                                        "Every pixel counts."
                                    ].map((q, i) => (
                                        <div className="hero-quote-box" key={i}>{q}</div>
                                    ))}
                                </div>
                        </div>
                        {/* Section 2: Skills Heading */}
                        <Section2 />
                       
        </div>
    );
};

export default Hero;
