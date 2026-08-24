import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import { useReveal } from "../../lib/useReveal";
import Reveal from "../../components/ui/Reveal";
import { site } from "../../config/site";
import "./Statement.css";

/** Counts from 0 to `value` once `run` flips true. */
const CountUp = ({ value, run }: { value: number; run: boolean }) => {
  const [n, setN] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!run || reduced) return;

    const DURATION = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // Ease-out cubic so the number decelerates into place.
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value, reduced]);

  // With reduced motion the final figure is shown straight away.
  return <>{reduced && run ? value : n}</>;
};

/**
 * Quiet band between the hero and the portfolio: the company line in
 * display italic, with the track record counted up beside it.
 */
const Statement = () => {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDListElement>({ threshold: 0.3 });

  const currentYear = new Date().getFullYear();
  const stats = [
    { value: currentYear - site.foundedYear, suffix: "", label: t.statement.statYears },
    { value: 50, suffix: "+", label: t.statement.statProjects },
    { value: 100, suffix: "%", label: t.statement.statLegal },
  ];

  return (
    <section className="stmt section" aria-label={t.statement.eyebrow}>
      <div className="container stmt__grid">
        <div className="stmt__quote">
          <Reveal className="eyebrow">{t.statement.eyebrow}</Reveal>
          <Reveal as="p" delay={100} className="stmt__text">
            {t.statement.line1}
            <em>{t.statement.lineEm}</em>
            {t.statement.line2}
          </Reveal>
          <Reveal delay={200}>
            <Link to="/about" className="link-underline">
              {t.statement.cta}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <dl className="stmt__stats" ref={ref}>
          {stats.map((s, i) => (
            <div className="stmt__stat" key={s.label} style={{ "--i": i } as React.CSSProperties}>
              <dd className="stmt__stat-value">
                <CountUp value={s.value} run={visible} />
                <span className="stmt__stat-suffix">{s.suffix}</span>
              </dd>
              <dt className="stmt__stat-label">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Statement;
