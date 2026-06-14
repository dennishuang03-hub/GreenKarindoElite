import React, { useState } from "react";
import "./ProjectSection.css";
import { useLang } from "../i18n/LanguageContext";
import type { Project } from "../data/projects";

// ── Icons ─────────────────────────────────────────────────────
const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BrochureIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
    <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ── Gallery ───────────────────────────────────────────────────
const Gallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [index, setIndex] = useState(0);
  const { t } = useLang();
  const safeImages = images.length > 0 ? images : [""];
  const current = safeImages[index];
  const hasMultiple = safeImages.length > 1;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + safeImages.length) % safeImages.length);

  return (
    <div className="ps-gallery">
      <div className="ps-gallery__frame">
        {current ? (
          <img
            className="ps-gallery__img"
            src={current}
            alt={`${alt} — ${index + 1}`}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) parent.classList.add("ps-gallery__frame--fallback");
            }}
          />
        ) : (
          <div className="ps-gallery__placeholder" aria-hidden="true" />
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              className="ps-gallery__nav ps-gallery__nav--prev"
              aria-label={t.projects.galleryPrev}
              onClick={() => go(-1)}
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              className="ps-gallery__nav ps-gallery__nav--next"
              aria-label={t.projects.galleryNext}
              onClick={() => go(1)}
            >
              <ArrowIcon dir="right" />
            </button>
            <div className="ps-gallery__count">
              {index + 1} / {safeImages.length}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="ps-gallery__dots" role="tablist">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              type="button"
              className={`ps-gallery__dot${i === index ? " ps-gallery__dot--active" : ""}`}
              aria-label={`${i + 1}`}
              aria-selected={i === index}
              role="tab"
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Project section ───────────────────────────────────────────
interface ProjectSectionProps {
  project: Project;
  /** Used to alternate the image / text layout. */
  index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index }) => {
  const { lang, t } = useLang();
  const reversed = index % 2 === 1;

  const name = project.name[lang];
  const statusLabel = t.projects.status[project.status];

  return (
    <section
      id={project.id}
      className={`ps-section${reversed ? " ps-section--reversed" : ""}`}
      aria-label={name}
    >
      <div className="ps-inner">
        <div className="ps-media">
          <Gallery images={project.images} alt={name} />
        </div>

        <div className="ps-content">
          <span className={`ps-status ps-status--${project.status}`}>
            <span className="ps-status__dot" aria-hidden="true" />
            {statusLabel}
          </span>

          <h2 className="ps-name">{name}</h2>

          <div className="ps-location">
            <PinIcon />
            <span>{project.location[lang]}</span>
          </div>

          <p className="ps-tagline">{project.tagline[lang]}</p>
          <p className="ps-desc">{project.description[lang]}</p>

          {project.specs.length > 0 && (
            <div className="ps-specs">
              <div className="ps-specs__title">{t.projects.detailsTitle}</div>
              <dl className="ps-specs__grid">
                {project.specs.map((spec, i) => (
                  <div className="ps-spec" key={i}>
                    <dt className="ps-spec__label">{spec.label[lang]}</dt>
                    <dd className="ps-spec__value">{spec.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="ps-actions">
            {project.brochureUrl && (
              <a
                className="ps-btn ps-btn--primary"
                href={project.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrochureIcon />
                {t.projects.viewBrochure}
              </a>
            )}
            {project.mapUrl && (
              <a
                className="ps-btn ps-btn--ghost"
                href={project.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinIcon />
                {t.projects.seeLocation}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
