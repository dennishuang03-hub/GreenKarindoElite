import { useState } from "react";
import type { FC } from "react";
import { useLang } from "../../i18n/LanguageContext";

// Prefix /public paths with Vite's base URL so images resolve
// correctly even if the site is deployed under a sub-path.
const withBase = (p: string): string => {
  if (!p.startsWith("/")) return p;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + p;
};

interface ProjectGalleryProps {
  images: string[];
  alt: string;
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ images, alt }) => {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const safeIndex = Math.min(current, images.length - 1);
  const hasMultiple = images.length > 1;

  const go = (next: number) => {
    const count = images.length;
    setCurrent(((next % count) + count) % count);
  };

  return (
    <div className="proj-gallery">
      <div className="proj-gallery__stage">
        <img
          key={safeIndex}
          src={withBase(images[safeIndex])}
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
              {safeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="proj-gallery__dots" role="tablist">
          {images.map((img, i) => (
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
