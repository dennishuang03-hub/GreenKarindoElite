import React from 'react';
import AboutHeroSection from '../sections/AboutUs/AboutHeroSection';
import VisionMissionSection from '../sections/AboutUs/VisionMissionSection';

const About: React.FC = () => {
  return (
    <section>
        <AboutHeroSection />
        <VisionMissionSection />
    </section>

  );
};

export default About;