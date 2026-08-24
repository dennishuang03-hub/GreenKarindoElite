import type { CSSProperties } from "react";
import { webpFor, withBase } from "../../lib/media";

interface PictureProps {
  /** Root-relative source, e.g. "/projects/sea-view/Exterior.jpg". */
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Above-the-fold images should be "eager" + high priority. */
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

/**
 * Image with an automatic WebP source.
 *
 * `npm run images` writes a .webp beside every JPG/PNG in /public;
 * browsers that support it take the smaller file, everyone else falls
 * back to the original. If the .webp has not been generated yet the
 * <source> simply 404s and the fallback <img> renders — so this is
 * safe to use before running the optimiser.
 */
const Picture = ({
  src,
  alt,
  className,
  style,
  priority = false,
  sizes,
  onClick,
}: PictureProps) => {
  const webp = webpFor(src);

  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" sizes={sizes} />}
      <img
        src={withBase(src)}
        alt={alt}
        className={className}
        style={style}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onClick={onClick}
      />
    </picture>
  );
};

export default Picture;
