import React from 'react';
import './VisionMission.css';

interface VisionCardProps {
  /** The vision statement text */
  vision?: string;
  /** Eyebrow label above the statement */
  label?: string;
}

const DEFAULT_VISION =
  'Menjadi leading luxury property group di Indonesia, yang dikenal lewat exceptional developments yang merepresentasikan elegance, exclusivity, dan lasting value.';

const VisionCard: React.FC<VisionCardProps> = ({
  vision = DEFAULT_VISION,
  label = 'Visi',
}) => {
  return (
    <article className="vm-vision">
      <div className="vm-card__eyebrow">{label}</div>
      <p className="vm-vision__text">{vision}</p>
    </article>
  );
};

export default VisionCard;
