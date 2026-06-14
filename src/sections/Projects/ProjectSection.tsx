import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { useLang } from "../../i18n/LanguageContext";
import type { Project } from "../../data/projects";
import ProjectGallery from "./ProjectGallery";

// Prefix /public paths (e.g. brochure PDFs) with the Vite base URL.
const withBase = (p: string): string => {
  if (!p.startsWith("/")) return p;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + p;
};

const BrochureIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
    <path d="M6 3h8l4 4v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 3v4h4M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

interface ProjectSectionProps {
  project: Project;
  /** Even / odd index flips the image-text layout for visual rhythm. */
  index: number;
}

const ProjectSection: FC<ProjectSectionProps> = ({ project, index }) => {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reversed = index % 2 === 1;

  return (
    <article
      ref={ref}
      id={project.id}
      className={`proj-section${visible ? " is-visible" : ""}${reversed ? " proj-section--reversed" : ""}`}
    >
      <div className="proj-section__inner">

        {/* ── Media ── */}
        <div className="proj-section__media">
          <ProjectGallery images={project.images} alt={project.name[lang]} />
        </div>

        {/* ── Content ── */}
        <div className="proj-section__content">
          <span className={`proj-status proj-status--${project.status}`}>
            <span className="proj-status__dot" aria-hidden="true" />
            {t.projects.status[project.status]}
          </span>

          <h2 className="proj-section__name">{project.name[lang]}</h2>
          <p className="proj-section__tagline">{project.tagline[lang]}</p>

          <div className="proj-section__location">
            <LocationIcon />
            <span>{project.location[lang]}</span>
          </div>

          <p className="proj-section__desc">{project.description[lang]}</p>

          {project.specs.length > 0 && (
            <div className="proj-specs">
              <div className="proj-specs__title">{t.projects.detailsTitle}</div>
              <dl className="proj-specs__grid">
                {project.specs.map((spec, i) => (
                  <div className="proj-specs__row" key={i}>
                    <dt>{spec.label[lang]}</dt>
                    <dd>{spec.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="proj-section__actions">
            {project.brochureUrl && (
              <a
                href={withBase(project.brochureUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn--primary"
              >
                <BrochureIcon />
                {t.projects.viewBrochure}
              </a>
            )}
            {project.mapUrl && (
              <a
                href={project.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn--ghost"
              >
                <LocationIcon />
                {t.projects.seeLocation}
              </a>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};

export default ProjectSection;
