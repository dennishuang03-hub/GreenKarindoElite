import React from 'react';
import '../../components/VisionMission.css';
import VisionCard from '../../components/VisionCard';
import MissionList from '../../components/MissionList';

const VisionMissionSection: React.FC = () => {
  return (
    <section className="vm-section" aria-label="Vision and Mission">
      <div className="vm-section__inner">

        {/* Heading */}
        <div className="vm-heading">
          <div className="vm-heading__eyebrow">Visi &amp; Misi</div>
          <h2 className="vm-heading__title">
            Vision &amp; <em>Mission</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="vm-grid">
          <VisionCard />
          <MissionList />
        </div>

      </div>
    </section>
  );
};

export default VisionMissionSection;