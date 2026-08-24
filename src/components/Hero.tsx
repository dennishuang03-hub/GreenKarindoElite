import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroBg from "../assets/Gate.webp";
import { useLang } from "../i18n/LanguageContext";
import { site } from "../config/site";

/**
 * Home hero — a single full-height stage.
 *
 * The headline arrives as masked lines sliding up from behind a
 * hairline, the background drifts on scroll (parallax) and slowly
 * scales (Ken Burns), and a facts rail runs along the bottom edge in
 * place of the old pill badges.
 */
const Hero = () => {
  const { t } = useLang();
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax: translate the background at ~35% of scroll speed.
  // Skipped for reduced-motion users and on coarse pointers, where the
  // repaint cost is not worth the effect.
  useEffect(() => {
    const node = bgRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(window.scrollY, window.innerHeight);
        node.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const facts = [
    { value: String(site.foundedYear), label: t.hero.factSince },
    { value: "50+", label: t.hero.factProjects },
    { value: "SHM", label: t.hero.factLegal },
    { value: "KPR", label: t.hero.factFinance },
  ];

  return (
    <section className="hero" aria-label={`${site.name} — hero`}>
      {/* Background stack: image, Ken Burns wrapper, gradient scrims */}
      <div className="hero__bg-wrap" ref={bgRef} aria-hidden="true">
        <div className="hero__bg" style={{ backgroundImage: `url(${heroBg})` }} />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />

      {/* Thin frame inset from the viewport edges — brochure cover cue */}
      <div className="hero__frame" aria-hidden="true">
        <span className="hero__frame-line hero__frame-line--t" />
        <span className="hero__frame-line hero__frame-line--b" />
        <span className="hero__frame-line hero__frame-line--l" />
        <span className="hero__frame-line hero__frame-line--r" />
      </div>

      <div className="hero__inner container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-rule" />
          <span className="hero__eyebrow-text">{t.hero.eyebrow}</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__line"><span className="hero__line-in">Green Karindo</span></span>
          <span className="hero__line"><span className="hero__line-in"><em>Elite</em></span></span>
        </h1>

        <p className="hero__subtitle">{t.hero.subtitle}</p>

        <p className="hero__tagline">
          {t.hero.taglineLine1} {t.hero.taglineLine2}
        </p>

        <div className="hero__actions">
          <Link to="/projects" className="btn btn--primary">
            {t.hero.ctaPrimary}
            <svg className="btn__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/contact" className="btn btn--ghost-ink">
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Vertical scroll cue on the right edge */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">{t.hero.scroll}</span>
        <span className="hero__scroll-track"><span className="hero__scroll-dot" /></span>
      </div>

      {/* Facts rail replaces the old badge pills */}
      <dl className="hero__facts">
        {facts.map((f) => (
          <div className="hero__fact" key={f.label}>
            <dt className="hero__fact-label">{f.label}</dt>
            <dd className="hero__fact-value">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
