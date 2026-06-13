import React, { useEffect, useRef, useState } from 'react';
import '../../components/VisionMission.css';
import VisionCard from '../../components/VisionCard';
import MissionList from '../../components/MissionList';
import { useLang } from '../../i18n/LanguageContext';

const VisionMissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Reveal once the section scrolls into view (first visit / first scroll).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`vm-section${visible ? ' is-visible' : ''}`}
      aria-label="Vision and Mission"
    >
      <div className="vm-section__inner">

        {/* Heading */}
        <div className="vm-heading vm-reveal">
          <div className="vm-heading__eyebrow">{t.vm.eyebrow}</div>
          <h2 className="vm-heading__title">
            {t.vm.titlePre}<em>{t.vm.titleEm}</em>
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