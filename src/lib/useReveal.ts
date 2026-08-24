import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view.
 *
 * Replaces the three near-identical IntersectionObserver copies that
 * used to live inside the footer, the contact section and each
 * project section.
 *
 * The observer disconnects after the first intersection — reveals are
 * one-way, so re-entering the viewport never replays the animation.
 */
export interface UseRevealOptions {
  /** How much of the element must be visible before revealing. */
  threshold?: number;
  /** Shrink/grow the trigger area, e.g. "0px 0px -12% 0px". */
  rootMargin?: string;
  /** Reveal without waiting (used for above-the-fold content). */
  immediate?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  immediate = false,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  // Reveal immediately when asked to, and on any browser without an
  // IntersectionObserver — content must never depend on the animation.
  const [visible, setVisible] = useState(
    () => immediate || typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (visible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    // Safety net — an animation must never be able to hide content.
    const fallback = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold, rootMargin, visible]);

  return { ref, visible };
}
