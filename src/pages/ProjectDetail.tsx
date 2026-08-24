import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useProject, useProjects, coverImage, allImages } from "../data/projects";
import { useSeo } from "../lib/useSeo";
import { withBase } from "../lib/media";
import { whatsappLink } from "../config/site";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import ProjectGallery from "../sections/Projects/ProjectGallery";
import SitePlan from "../sections/Projects/SitePlan";
import ProgressTimeline from "../sections/Projects/ProgressTimeline";
import NotFound from "./NotFound";
import "../sections/Projects/ProjectDetail.css";

const BrochureIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M14 3v4h4M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

/**
 * Highlights whichever in-page section the reader is currently in.
 *
 * The active section is the last one whose top edge has passed under
 * the sticky bar. Comparing intersection ratios instead favours
 * whichever section happens to be shortest, which marked the gallery
 * as current while the overview still filled the screen.
 */
function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  // The caller builds the id list inline on every render; keying the
  // effect on its contents stops it being rebuilt each time.
  const key = ids.join(",");

  useEffect(() => {
    const list = key ? key.split(",") : [];
    if (list.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // Measure the real bar, so the line stays correct at any zoom.
      const bar = document.querySelector(".pnav");
      const line = (bar?.getBoundingClientRect().bottom ?? 120) + 16;

      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const { project, notFound, loading } = useProject(slug);
  const { projects } = useProjects();

  // Each project page is its own document — start it at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  // A project may legitimately have no gallery, no plan and no progress
  // log yet — every section is offered only when it has something in it.
  const hasGallery = allImages(project?.images ?? []).length > 0;
  const cover = project ? coverImage(project) : "";

  const sections = [
    { id: "overview", label: t.projects.tabOverview, show: true },
    { id: "gallery", label: t.projects.tabGallery, show: hasGallery },
    { id: "site-plan", label: t.sitePlan.tab, show: Boolean(project?.sitePlan) },
    { id: "progress", label: t.progress.tab, show: Boolean(project?.progress) },
  ].filter((s) => s.show);

  const active = useScrollSpy(sections.map((s) => s.id));

  useSeo({
    title: project ? `${project.name[lang]} — ${project.location[lang]}` : t.projects.loading,
    description: project?.tagline[lang] || project?.description[lang],
    image: cover ? withBase(cover) : undefined,
    path: `/projects/${slug}`,
    type: "article",
    jsonLd: project
      ? {
          "@context": "https://schema.org",
          "@type": "Residence",
          name: project.name[lang],
          description: project.description[lang],
          address: {
            "@type": "PostalAddress",
            addressLocality: project.location[lang],
            addressCountry: "ID",
          },
        }
      : undefined,
  });

  if (loading) {
    return (
      <main className="pdetail" id="main">
        <p className="projects__msg container">{t.projects.loading}</p>
      </main>
    );
  }

  if (notFound || !project) return <NotFound />;

  const others = (projects ?? []).filter((p) => p.id !== project.id);
  const next = others[0];

  const enquiry = whatsappLink(`${t.projects.enquiryPrefix} ${project.name[lang]}`);

  return (
    <main className="pdetail" id="main">
      <PageHeader
        eyebrow={project.location[lang]}
        titlePre={project.name[lang]}
        lead={project.tagline[lang]}
        image={cover ? withBase(cover) : undefined}
      >
        <div className="pdetail__headmeta">
          <span className={`status status--${project.status}`}>
            <span className="status__dot" aria-hidden="true" />
            {t.projects.status[project.status]}
          </span>
          {project.priceFrom && (
            <span className="pdetail__price">{project.priceFrom[lang]}</span>
          )}
        </div>

        <div className="pdetail__actions">
          <a className="btn btn--primary" href={enquiry} target="_blank" rel="noopener noreferrer">
            {t.projects.enquire}
            <svg className="btn__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {project.brochureUrl && (
            <a
              className="btn btn--ghost-ink"
              href={withBase(project.brochureUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrochureIcon />
              {t.projects.viewBrochure}
            </a>
          )}
          {project.mapUrl && (
            <a className="btn btn--ghost-ink" href={project.mapUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              {t.projects.seeLocation}
            </a>
          )}
        </div>
      </PageHeader>

      {/* ── In-page navigation ── */}
      <nav className="pnav" aria-label={project.name[lang]}>
        <div className="container pnav__inner">
          {/* The label is hidden on small screens, so the name lives here. */}
          <Link to="/projects" className="pnav__back" aria-label={t.projects.backToAll}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="pnav__back-label">{t.projects.backToAll}</span>
          </Link>

          <div className="pnav__tabs">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`pnav__tab${active === s.id ? " pnav__tab--active" : ""}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Overview ── */}
      <section className="pover section" id="overview" aria-label={t.projects.tabOverview}>
        <div className="container pover__grid">
          <div className="pover__main">
            <Reveal as="span" className="eyebrow">{t.projects.tabOverview}</Reveal>
            <Reveal as="p" delay={90} className="pover__desc">
              {project.description[lang]}
            </Reveal>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="pover__highlights">
                {project.highlights.map((h, i) => (
                  <Reveal as="li" key={h[lang]} delay={i * 70} className="pover__highlight">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                      <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {h[lang]}
                  </Reveal>
                ))}
              </ul>
            )}
          </div>

          {project.specs.length > 0 && (
            <Reveal delay={140} className="pover__specs">
              <h2 className="pover__specs-title">{t.projects.detailsTitle}</h2>
              <dl className="pover__specs-list">
                {project.specs.map((s) => (
                  <div className="pover__spec" key={s.label[lang]}>
                    <dt>{s.label[lang]}</dt>
                    <dd>{s.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Gallery ── */}
      {hasGallery && (
      <section className="pgal section section--ink" id="gallery" aria-label={t.projects.tabGallery}>
        <div className="container">
          <div className="pgal__head">
            <span className="eyebrow">{t.projects.tabGallery}</span>
            <h2 className="display-title pgal__title">{t.projects.galleryTitle}</h2>
          </div>
          <ProjectGallery images={project.images} alt={project.name[lang]} />
        </div>
      </section>
      )}

      {project.sitePlan && (
        <SitePlan plan={project.sitePlan} projectName={project.name[lang]} />
      )}

      {project.progress && (
        <ProgressTimeline progress={project.progress} projectName={project.name[lang]} />
      )}

      {/* ── Closing CTA ── */}
      <section className="pcta section">
        <div className="container pcta__inner">
          <Reveal className="pcta__text">
            <span className="eyebrow">{t.projects.ctaEyebrow}</span>
            <h2 className="pcta__title">{t.projects.ctaTitle}</h2>
            <p className="pcta__desc">{t.projects.ctaDesc}</p>
            <div className="pcta__buttons">
              <Link to="/contact" className="btn btn--primary">
                {t.projects.ctaPrimary}
              </Link>
              <a className="btn btn--outline" href={enquiry} target="_blank" rel="noopener noreferrer">
                {t.projects.ctaWhatsapp}
              </a>
            </div>
          </Reveal>

          {next && (
            <Reveal delay={120} className="pnext">
              <span className="pnext__label">{t.projects.nextProject}</span>
              <Link to={`/projects/${next.id}`} className="pnext__link">
                <span className="pnext__name">{next.name[lang]}</span>
                <span className="pnext__loc">{next.location[lang]}</span>
                <span className="pnext__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
