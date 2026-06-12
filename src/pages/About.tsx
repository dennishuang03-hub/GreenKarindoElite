import React, { useEffect } from 'react';
import AboutHeroSection from '../sections/AboutUs/AboutHeroSection';
import VisionMissionSection from '../sections/AboutUs/VisionMissionSection';
import './About.css';

const About: React.FC = () => {
  // Scroll to the section named in the URL hash, e.g. /About#vision-mission
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Delay slightly on first load so the sections have rendered first.
    const t = setTimeout(scrollToHash, 60);

    // Re-run when the hash changes while already on this page.
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <section>
      <div id="about-hero" className="section-anchor">
        <AboutHeroSection />
      </div>
      <div id="vision-mission" className="section-anchor">
        <VisionMissionSection />
      </div>
    </section>
  );
};

export default About;