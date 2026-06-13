import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { useLang } from "../i18n/LanguageContext";

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const badges = t.hero.badges;

  return (
    <section
      className="hero"
      ref={heroRef}
      aria-label="Green Karindo Elite — Hero"
    >
      {/* ── Parallax background ── */}
      <div
        className="hero__bg"
        style={{ transform: `translateY(${scrollY * 0.28}px)` }}
        aria-hidden="true"
      />
      {/* ── Dark overlay — gradient from bottom like brochure ── */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* ── Main content — centered like brochure ── */}
      <div className="hero__body">

        {/* Eyebrow — "A MODERN PRIVATE RESIDENCE" equivalent */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-text">
            {t.hero.eyebrow}
          </span>
        </div>

        {/* Giant serif title — mimics "Sea View" large treatment */}
        <h1 className="hero__title">
          Green Karindo
          <br />
          <em>Elite</em>
        </h1>

        {/* Sub-brand line — italic serif like "Bukit Indah Karimun" */}
        <p className="hero__subtitle">{t.hero.subtitle}</p>

        {/* Tagline — like "Your Home Above the Horizon." */}
        <p className="hero__tagline">
          {t.hero.taglineLine1}<br />
          {t.hero.taglineLine2}
        </p>

        {/* CTA buttons */}
        <div className="hero__actions">
          <a href="#projects" className="hero__btn hero__btn--primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="/contact" className="hero__btn hero__btn--ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* ── Badge strip — matches brochure bottom pills ── */}
      <div className="hero__badges" role="list" aria-label="Keunggulan kami">
        {badges.map((b) => (
          <div className="hero__badge" role="listitem" key={b}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {b}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
