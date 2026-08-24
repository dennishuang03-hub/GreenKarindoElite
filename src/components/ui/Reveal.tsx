import type { ElementType, ReactNode } from "react";
import { useReveal } from "../../lib/useReveal";

type RevealVariant = "up" | "clip" | "line";

const VARIANT_CLASS: Record<RevealVariant, [string, string]> = {
  up: ["reveal", "reveal--visible"],
  clip: ["reveal-clip", "reveal-clip--visible"],
  line: ["reveal-line", "reveal-line--visible"],
};

interface RevealProps {
  children?: ReactNode;
  /** Element to render — section, article, h2, span… */
  as?: ElementType;
  /** Stagger, in milliseconds, applied as a transition-delay. */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  threshold?: number;
  id?: string;
}

/**
 * Wraps content in a scroll-triggered entrance. Three variants share
 * the same observer: a settle-up fade, an image clip wipe, and a
 * hairline that draws out from its left edge.
 */
const Reveal = ({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
  threshold,
  id,
}: RevealProps) => {
  const { ref, visible } = useReveal<HTMLElement>({ threshold });
  const [baseClass, visibleClass] = VARIANT_CLASS[variant];

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${baseClass}${visible ? ` ${visibleClass}` : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
