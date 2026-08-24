import { useEffect } from "react";

/**
 * Per-page document head management.
 *
 * The site is a single-page app, so the static <head> in index.html is
 * all a crawler or a WhatsApp link preview would otherwise see. This
 * hook rewrites the title, description, canonical URL, Open Graph tags
 * and (optionally) a JSON-LD block whenever a page mounts.
 */

export interface SeoOptions {
  title: string;
  description?: string;
  /** Absolute or root-relative image path for the share preview. */
  image?: string;
  /** Path only, e.g. "/projects/sea-view-karimun". */
  path?: string;
  /** Structured data object injected as application/ld+json. */
  jsonLd?: Record<string, unknown>;
  /** "website" (default) or "article". */
  type?: string;
}

const SITE_NAME = "Green Karindo Elite";

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSeo({
  title,
  description,
  image,
  path,
  jsonLd,
  type = "website",
}: SeoOptions) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = origin + (path ?? window.location.pathname);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const absImage = image
      ? image.startsWith("http")
        ? image
        : origin + image
      : `${origin}/og-default.jpg`;

    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", absImage);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absImage);
    setLink("canonical", url);

    // JSON-LD is page-scoped: remove the previous page's block first.
    const LD_ID = "gke-jsonld";
    document.getElementById(LD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = LD_ID;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(LD_ID)?.remove();
    };
    // jsonLd is an inline object literal at every call site; stringifying
    // it keeps the effect from re-running on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, path, type, JSON.stringify(jsonLd ?? null)]);
}
