import React from 'react';
import './VisionMission.css';
import { useLang } from '../i18n/LanguageContext';

interface VisionCardProps {
  /** The vision statement text */
  vision?: string;
  /** Eyebrow label above the statement */
  label?: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ vision, label }) => {
  const { t } = useLang();
  const resolvedVision = vision ?? t.vm.vision;
  const resolvedLabel = label ?? t.vm.visionLabel;
  return (
    <article className="vm-vision">
      <div className="vm-card__eyebrow">{resolvedLabel}</div>
      <p className="vm-vision__text">{resolvedVision}</p>
    </article>
  );
};

export default VisionCard;
