import React from 'react';
import './AboutHero.css';
import heroBg from '../assets/AboutHero.jpg';

// ── Scroll indicator ──────────────────────────────────────────
const ScrollIndicator = () => (
  <div className="ah-scroll" aria-hidden="true">
    <div className="ah-scroll__line" />
    <span className="ah-scroll__label">Scroll</span>
  </div>
);

// ── About Hero ────────────────────────────────────────────────
const AboutHero: React.FC = () => {
  return (
    <section className="about-hero" aria-label="About Us Hero">

      {/* Background image */}
      <div
        className="about-hero__bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      {/* Dark gradient overlays */}
      <div className="about-hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="about-hero__inner">

        {/* Eyebrow */}
        <div className="ah-eyebrow">Tentang Kami</div>

        {/* Company name */}
        <h1 className="ah-title">
          PT. Green<br />
          Karindo <span className="ah-title__em">Elite.</span>
        </h1>

        {/* Tagline */}
        <p className="ah-tagline">Kontraktor &amp; Developer</p>

        {/* Divider */}
        <div className="ah-divider" aria-hidden="true" />

        {/* Founding paragraph */}
        <p className="ah-body">
          Didirikan pada tanggal 22 Oktober 1981 oleh{' '}
          <span className="ah-body__name">Christopher Lee</span>{' '}
          dengan nama PT Green Karindo Elite, PT Green Karindo Elite kini menjadi
          salah satu pengembang properti terkemuka dan paling terdiversifikasi
          di Tanjung Balai Karimun, Indonesia.
        </p>

        {/* Founding year badge */}
        <div className="ah-since">
          <span className="ah-since__label">Berdiri sejak</span>
          <span className="ah-since__year">1981</span>
        </div>

      </div>

      {/* Scroll cue */}
      <ScrollIndicator />

    </section>
  );
};

export default AboutHero;
