import type { ReactNode } from "react";
import Reveal from "./Reveal";
import "./SectionHeading.css";

interface SectionHeadingProps {
  eyebrow: string;
  /** Chapter marker, e.g. "01". Omit to hide it. */
  index?: string;
  titlePre: string;
  titleEm?: string;
  lead?: ReactNode;
  align?: "left" | "center";
  /** Renders an <h1> instead of the default <h2> (page headers). */
  as?: "h1" | "h2";
  className?: string;
}

/**
 * The editorial section header used across every page: chapter number,
 * letterspaced eyebrow, display title with an italic gold emphasis,
 * and an optional lead paragraph — all revealing in sequence.
 */
const SectionHeading = ({
  eyebrow,
  index,
  titlePre,
  titleEm,
  lead,
  align = "left",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) => (
  <div className={`sh sh--${align}${className ? ` ${className}` : ""}`}>
    <Reveal className="sh__top">
      {index && <span className="chapter-no sh__index">{index}</span>}
      <span className={`eyebrow${align === "center" ? " eyebrow--center" : ""}`}>
        {eyebrow}
      </span>
    </Reveal>

    <Reveal as={Tag} delay={90} className="sh__title display-title">
      {titlePre}
      {titleEm && <em>{titleEm}</em>}
    </Reveal>

    {lead && (
      <Reveal delay={180} className="sh__lead lead">
        {lead}
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
