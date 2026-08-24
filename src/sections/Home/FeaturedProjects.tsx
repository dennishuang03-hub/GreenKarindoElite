import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import { useProjects, firstImage } from "../../data/projects";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";
import Picture from "../../components/ui/Picture";
import "./FeaturedProjects.css";

/**
 * The portfolio index.
 *
 * Desktop: a numbered list of projects on the left; hovering a row
 * crossfades the large preview on the right — the visitor browses the
 * whole portfolio without a single click or an autoplaying carousel.
 * Mobile: the same projects as stacked cards.
 */
const FeaturedProjects = () => {
  const { lang, t } = useLang();
  const { projects } = useProjects();
  const [active, setActive] = useState(0);

  const list = projects ?? [];
  if (list.length === 0) return null;

  const current = list[Math.min(active, list.length - 1)];

  return (
    <section className="feat section section--ink" id="projects" aria-label={t.featured.eyebrow}>
      <div className="container">
        <div className="feat__head">
          <SectionHeading
            index="01"
            eyebrow={t.featured.eyebrow}
            titlePre={t.featured.titlePre}
            titleEm={t.featured.titleEm}
          />
          <Reveal delay={140} className="feat__head-side">
            <p className="feat__head-note">{t.featured.note}</p>
            <Link to="/projects" className="link-underline">
              {t.featured.viewAll}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="feat__body">
          {/* ── Preview panel (desktop) ── */}
          <Reveal variant="clip" className="feat__preview" threshold={0.05}>
            <div className="feat__frames">
              {list.map((p, i) => (
                <Picture
                  key={p.id}
                  src={firstImage(p.images)}
                  alt={p.name[lang]}
                  className={`feat__frame${i === active ? " feat__frame--active" : ""}`}
                  sizes="(max-width: 960px) 100vw, 52vw"
                />
              ))}
              <span className="feat__preview-scrim" aria-hidden="true" />
            </div>

            <div className="feat__preview-meta" key={current.id}>
              <span className={`status status--${current.status}`}>
                <span className="status__dot" aria-hidden="true" />
                {t.projects.status[current.status]}
              </span>
              <p className="feat__preview-loc">{current.location[lang]}</p>
              <p className="feat__preview-tag">{current.tagline[lang]}</p>
            </div>
          </Reveal>

          {/* ── Index list ── */}
          <ol className="feat__list">
            {list.map((p, i) => (
              <Reveal
                as="li"
                key={p.id}
                delay={i * 80}
                className={`feat__item${i === active ? " feat__item--active" : ""}`}
              >
                <Link
                  to={`/projects/${p.id}`}
                  className="feat__row"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="feat__no">{String(i + 1).padStart(2, "0")}</span>

                  {/* Thumbnail — the mobile stand-in for the hover preview */}
                  <span className="feat__thumb">
                    <Picture
                      src={firstImage(p.images)}
                      alt=""
                      className="feat__thumb-img"
                      sizes="120px"
                    />
                  </span>

                  <span className="feat__text">
                    <span className="feat__name">{p.name[lang]}</span>
                    <span className="feat__meta">
                      <span className={`status status--${p.status}`}>
                        <span className="status__dot" aria-hidden="true" />
                        {t.projects.status[p.status]}
                      </span>
                      <span className="feat__loc">{p.location[lang]}</span>
                    </span>
                    <span className="feat__tagline">{p.tagline[lang]}</span>
                  </span>

                  <span className="feat__go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
