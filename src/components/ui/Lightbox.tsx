import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Picture from "./Picture";
import { withBase } from "../../lib/media";
import "./Lightbox.css";

interface LightboxProps {
  images: string[];
  /** Index to open on; the viewer can move on from there. */
  startIndex: number;
  alt: string;
  onClose: () => void;
  /** Localised labels so the overlay speaks the visitor's language. */
  labels: { prev: string; next: string; close: string };
}

const SWIPE_THRESHOLD = 48;

/**
 * Full-screen image viewer: arrow keys and swipe to move, Escape to
 * close, a thumbnail rail for direct jumps. Rendered through a portal
 * so no ancestor's overflow or stacking context can clip it.
 */
const Lightbox = ({ images, startIndex, alt, onClose, labels }: LightboxProps) => {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const count = images.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  // Keyboard control.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, go, onClose]);

  // Freeze the page behind the overlay, and move focus into it.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Warm the neighbouring frames so paging feels instant.
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const src = images[((i % count) + count) % count];
      if (src) new Image().src = withBase(src);
    });
  }, [index, images, count]);

  return createPortal(
    <div
      className="lbx"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="lbx__close"
        aria-label={labels.close}
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <figure className="lbx__stage">
        <Picture
          key={images[index]}
          src={images[index]}
          alt={`${alt} — ${index + 1}`}
          className="lbx__img"
          priority
        />
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lbx__nav lbx__nav--prev"
            aria-label={labels.prev}
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
              <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="lbx__nav lbx__nav--next"
            aria-label={labels.next}
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="lbx__bar">
            <span className="lbx__counter">
              {String(index + 1).padStart(2, "0")}
              <span className="lbx__counter-sep">/</span>
              {String(count).padStart(2, "0")}
            </span>
            <div className="lbx__thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`lbx__thumb${i === index ? " lbx__thumb--active" : ""}`}
                  aria-label={`${i + 1}`}
                  onClick={() => setIndex(i)}
                >
                  <Picture src={src} alt="" className="lbx__thumb-img" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default Lightbox;
