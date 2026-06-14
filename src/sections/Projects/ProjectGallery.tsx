import { useState } from "react";
import type { FC } from "react";
import { useLang } from "../../i18n/LanguageContext";
import type { ProjectImages } from "../../data/projects";

// Prefix /public paths with Vite's base URL so images resolve
// correctly even if the site is deployed under a sub-path.
const withBase = (p: string): string => {
  if (!p.startsWith("/")) return p;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + p;
};

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

interface ProjectGalleryProps {
  images: ProjectImages;
  alt: string;
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ images, alt }) => {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState<"morning" | "night">("morning");

  // Does this project have separate morning / night image sets?
  // (Array.isArray inline so TypeScript narrows the union correctly.)
  const hasTimes = !Array.isArray(images);
  const activeImages = Array.isArray(images) ? images : images[time];

  if (!activeImages || activeImages.length === 0) return null;

  const safeIndex = Math.min(current, activeImages.length - 1);
  const hasMultiple = activeImages.length > 1;

  const go = (next: number) => {
    const count = activeImages.length;
    setCurrent(((next % count) + count) % count);
  };

  return (
    <div className="proj-gallery">
      <div className="proj-gallery__stage">
        <img
          key={`${hasTimes ? time : "img"}-${safeIndex}`}
          src={withBase(activeImages[safeIndex])}
          alt={`${alt} — ${safeIndex + 1}`}
          className="proj-gallery__img"
          loading="lazy"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              className="proj-gallery__nav proj-gallery__nav--prev"
              aria-label={t.projects.galleryPrev}
              onClick={() => go(safeIndex - 1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="proj-gallery__nav proj-gallery__nav--next"
              aria-label={t.projects.galleryNext}
              onClick={() => go(safeIndex + 1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="proj-gallery__counter">
              {safeIndex + 1} / {activeImages.length}
            </div>
          </>
        )}
      </div>

      {/* Morning / Night switch — only shown when both sets exist */}
      {hasTimes && (
        <div className="proj-gallery__times">
          <div
            className="proj-timeswitch"
            role="group"
            aria-label={`${t.projects.morning} / ${t.projects.night}`}
          >
            <button
              type="button"
              className={`proj-timeswitch__btn${time === "morning" ? " proj-timeswitch__btn--active" : ""}`}
              aria-pressed={time === "morning"}
              onClick={() => setTime("morning")}
            >
              <SunIcon />
              {t.projects.morning}
            </button>
            <button
              type="button"
              className={`proj-timeswitch__btn${time === "night" ? " proj-timeswitch__btn--active" : ""}`}
              aria-pressed={time === "night"}
              onClick={() => setTime("night")}
            >
              <MoonIcon />
              {t.projects.night}
            </button>
          </div>
        </div>
      )}

      {hasMultiple && (
        <div className="proj-gallery__dots" role="tablist">
          {activeImages.map((img, i) => (
            <button
              key={img}
              type="button"
              className={`proj-gallery__dot${i === safeIndex ? " proj-gallery__dot--active" : ""}`}
              aria-label={`${i + 1}`}
              aria-selected={i === safeIndex}
              role="tab"
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
