import React from 'react';
import './VisionMission.css';

interface MissionListProps {
  /** Array of mission statements */
  missions?: string[];
  /** Eyebrow label above the list */
  label?: string;
}

const DEFAULT_MISSIONS: string[] = [
  'Menghadirkan properti residensial dan komersial premium dengan uncompromising standards untuk kualitas dan craftsmanship-nya.',
  'Menciptakan development berkelas yang meningkatkan kualitas gaya hidup serta memberikan nilai yang abadi bagi Client dan Stakeholder.',
  'Membangun kepercayaan melalui profesionalisme, integritas, and long-term partnerships.',
  'Mendorong sustainable and responsible development demi masa depan generasi berikutnya.',
  'Terus mengejar inovasi dan keunggulan untuk mendefinisikan kembali gaya hidup mewah modern.',
];

const MissionList: React.FC<MissionListProps> = ({
  missions = DEFAULT_MISSIONS,
  label = 'Misi',
}) => {
  return (
    <article className="vm-mission">
      <div className="vm-card__eyebrow">{label}</div>
      <ol className="vm-mission__list">
        {missions.map((mission, index) => (
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
