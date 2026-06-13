import React from 'react';
import './VisionMission.css';
import { useLang } from '../i18n/LanguageContext';

interface MissionListProps {
  /** Array of mission statements */
  missions?: string[];
  /** Eyebrow label above the list */
  label?: string;
}

const MissionList: React.FC<MissionListProps> = ({ missions, label }) => {
  const { t } = useLang();
  const resolvedMissions = missions ?? t.vm.missions;
  const resolvedLabel = label ?? t.vm.missionLabel;
  return (
    <article className="vm-mission">
      <div className="vm-card__eyebrow">{resolvedLabel}</div>
      <ol className="vm-mission__list">
        {resolvedMissions.map((mission, index) => (
          <li className="vm-mission__item" key={index}>
            <span className="vm-mission__num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="vm-mission__text">{mission}</p>
          </li>
        ))}
      </ol>
    </article>
  );
};

export default MissionList;
