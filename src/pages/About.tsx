import React from 'react';
import './About.css';
import AboutHero from '../components/AboutHero';

const About: React.FC = () => {
  return (
    <main className="about-page">
      <AboutHero />
      {/* Add more About sections here (Our Story, Team, Vision & Mission, etc.) */}
    </main>
  );
};

export default About;