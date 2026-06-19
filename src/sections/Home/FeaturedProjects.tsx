import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import { useProjects } from "../../data/projects";
import type { ProjectImages } from "../../data/projects";
import "./FeaturedProjects.css";

const AUTOPLAY_MS = 5000;

// Resolve a /public path against Vite's base URL.
const withBase = (p: string): string =>
  p.startsWith("/") ? import.meta.env.BASE_URL.replace(/\/$/, "") + p : p;

// First image works whether the project uses a plain list or morning/night.
const firstImage = (images: ProjectImages): string =>
  Array.isArray(images) ? images[0] : images.morning[0];

const FeaturedProjects = () => {
  const { lang, t } = useLang();
  const { projects } = useProjects();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const list = projects ?? [];
  const count = list.length;

  // Auto-advance every 5s (unless paused or there's only one slide).
  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  const safe = Math.min(index, count - 1);

  return (
    <section className="feat" id="projects" aria-label="Featured projects">
      <div className="feat__head">
        <div className="feat__eyebrow">{t.featured.eyebrow}</div>
        <h2 className="feat__title">
          {t.featured.titlePre}
          <em>{t.featured.titleEm}</em>
        </h2>
      </div>

      <div
        className="feat__viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="feat__track"
          style={{ transform: `translateX(-${safe * 100}%)` }}
        >
          {list.map((p) => (
            <article className="feat__slide" key={p.id}>
              <div className="feat__media">
                <img
                  src={withBase(firstImage(p.images))}
                  alt={p.name[lang]}
                  loading="lazy"
                />
                <div className="feat__overlay" aria-hidden="true" />
                <span className={`feat__status feat__status--${p.status}`}>
                  <span className="feat__status-dot" aria-hidden="true" />
                  {t.projects.status[p.status]}
                </span>

                <div className="feat__info">
                  <h3 className="feat__name">{p.name[lang]}</h3>
                  <p className="feat__tagline">{p.tagline[lang]}</p>
                  <a className="feat__btn" href={`/projects#${p.id}`}>
                    {t.featured.learnMore}
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="feat__nav feat__nav--prev"
              aria-label={t.projects.galleryPrev}
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="feat__nav feat__nav--next"
              aria-label={t.projects.galleryNext}
              onClick={() => setIndex((i) => (i + 1) % count)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="feat__dots" role="tablist">
              {list.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`feat__dot${i === safe ? " feat__dot--active" : ""}`}
                  aria-label={p.name[lang]}
                  aria-selected={i === safe}
                  role="tab"
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
