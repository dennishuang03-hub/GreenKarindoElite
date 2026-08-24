import { useState } from "react";
import type { FC } from "react";
import { useLang } from "../../i18n/LanguageContext";
import type { ProjectImages } from "../../data/projects";
import Picture from "../../components/ui/Picture";
import Lightbox from "../../components/ui/Lightbox";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ProjectGalleryProps {
  images: ProjectImages;
  alt: string;
}

/**
 * Project gallery: a large stage, a thumbnail rail, an optional
 * morning/night switch, and a full-screen lightbox on click.
 */
const ProjectGallery: FC<ProjectGalleryProps> = ({ images, alt }) => {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState<"morning" | "night">("morning");
  const [zoomed, setZoomed] = useState<number | null>(null);

  const hasTimes = !Array.isArray(images);
  const active = Array.isArray(images) ? images : images[time];

  if (!active || active.length === 0) return null;

  const index = Math.min(current, active.length - 1);
  const many = active.length > 1;
  const go = (next: number) => setCurrent(((next % active.length) + active.length) % active.length);

  return (
    <div className="gal">
      <div className="gal__stage">
        <button
          type="button"
          className="gal__stage-btn"
          aria-label={t.projects.openImage}
          onClick={() => setZoomed(index)}
        >
          <Picture
            key={`${hasTimes ? time : "img"}-${index}`}
            src={active[index]}
            alt={`${alt} — ${index + 1}`}
            className="gal__img"
            sizes="(max-width: 900px) 100vw, 70vw"
            priority={index === 0}
          />
          <span className="gal__expand" aria-hidden="true">
            <ExpandIcon />
          </span>
        </button>

        {many && (
          <>
            <button
              type="button"
              className="gal__nav gal__nav--prev"
              aria-label={t.projects.galleryPrev}
              onClick={() => go(index - 1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="gal__nav gal__nav--next"
              aria-label={t.projects.galleryNext}
              onClick={() => go(index + 1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span className="gal__counter">
              {String(index + 1).padStart(2, "0")}
              <span className="gal__counter-sep">/</span>
              {String(active.length).padStart(2, "0")}
            </span>
          </>
        )}

        {hasTimes && (
          <div className="gal__times" role="group" aria-label={`${t.projects.morning} / ${t.projects.night}`}>
            <span
              className="gal__times-thumb"
              aria-hidden="true"
              style={{ transform: `translateX(${time === "night" ? "100%" : "0%"})` }}
            />
            <button
              type="button"
              className={`gal__time${time === "morning" ? " gal__time--active" : ""}`}
              aria-pressed={time === "morning"}
              onClick={() => setTime("morning")}
            >
              <SunIcon />
              {t.projects.morning}
            </button>
            <button
              type="button"
              className={`gal__time${time === "night" ? " gal__time--active" : ""}`}
              aria-pressed={time === "night"}
              onClick={() => setTime("night")}
            >
              <MoonIcon />
              {t.projects.night}
            </button>
          </div>
        )}
      </div>

      {many && (
        <div className="gal__rail">
          {active.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`gal__thumb${i === index ? " gal__thumb--active" : ""}`}
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => setCurrent(i)}
            >
              <Picture src={src} alt="" className="gal__thumb-img" sizes="140px" />
            </button>
          ))}
        </div>
      )}

      {zoomed !== null && (
        <Lightbox
          images={active}
          startIndex={zoomed}
          alt={alt}
          onClose={() => setZoomed(null)}
          labels={{
            prev: t.projects.galleryPrev,
            next: t.projects.galleryNext,
            close: t.projects.close,
          }}
        />
      )}
    </div>
  );
};

export default ProjectGallery;
