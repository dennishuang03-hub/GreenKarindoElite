import type { ReactNode } from "react";
import "./PageHeader.css";

interface PageHeaderProps {
  eyebrow: string;
  titlePre: string;
  titleEm?: string;
  lead?: ReactNode;
  /** Optional background image for a fuller, cover-like header. */
  image?: string;
  children?: ReactNode;
}

/**
 * Dark header band that opens every inner page. Type animates in on
 * mount (these are above the fold, so there is nothing to wait for).
 */
const PageHeader = ({
  eyebrow,
  titlePre,
  titleEm,
  lead,
  image,
  children,
}: PageHeaderProps) => (
  <header className={`phead${image ? " phead--image" : ""}`}>
    {image && (
      <>
        <div
          className="phead__bg"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
        <div className="phead__scrim" aria-hidden="true" />
      </>
    )}

    <div className="container phead__inner">
      <div className="phead__eyebrow">
        <span className="phead__rule" aria-hidden="true" />
        <span className="phead__eyebrow-text">{eyebrow}</span>
      </div>

      <h1 className="phead__title">
        <span className="phead__line">
          <span className="phead__line-in">
            {titlePre}
            {titleEm && <em>{titleEm}</em>}
          </span>
        </span>
      </h1>

      {lead && <p className="phead__lead">{lead}</p>}
      {children}
    </div>
  </header>
);

export default PageHeader;
