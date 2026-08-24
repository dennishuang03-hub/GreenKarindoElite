import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useProjects, coverImage, type ProjectStatus } from "../data/projects";
import { useSeo } from "../lib/useSeo";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import Picture from "../components/ui/Picture";
import "../sections/Projects/Projects.css";

type Filter = "all" | ProjectStatus;

const FILTERS: Filter[] = ["all", "new-launch", "available", "coming-soon"];

/**
 * Portfolio index. Every project is a full-width editorial card that
 * alternates image side, and a status filter narrows the list.
 */
function Projects() {
  const { lang, t } = useLang();
  const { projects, error } = useProjects();
  const [filter, setFilter] = useState<Filter>("all");

  useSeo({
    title: t.seo.projectsTitle,
    description: t.seo.projectsDesc,
    path: "/projects",
  });

  const list = useMemo(() => projects ?? [], [projects]);

  // Only offer a filter chip when at least one project carries it.
  const available = useMemo(
    () => FILTERS.filter((f) => f === "all" || list.some((p) => p.status === f)),
    [list]
  );

  const shown = filter === "all" ? list : list.filter((p) => p.status === filter);

  return (
    <main className="projects" id="main">
      <PageHeader
        eyebrow={t.projects.eyebrow}
        titlePre={t.projects.titlePre}
        titleEm={t.projects.titleEm}
        lead={t.projects.intro}
      />

      {projects === null && !error && (
        <p className="projects__msg container">{t.projects.loading}</p>
      )}

      {(error || (projects && projects.length === 0)) && (
        <p className="projects__msg container">{t.projects.empty}</p>
      )}

      {list.length > 0 && (
        <div className="container">
          {available.length > 2 && (
            <Reveal className="projects__filters" threshold={0.05}>
              {available.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`projects__filter${filter === f ? " projects__filter--active" : ""}`}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? t.projects.filterAll : t.projects.status[f]}
                  <span className="projects__filter-count">
                    {f === "all" ? list.length : list.filter((p) => p.status === f).length}
                  </span>
                </button>
              ))}
            </Reveal>
          )}

          <ol className="projects__list">
            {shown.map((p, i) => (
              <Reveal as="li" key={p.id} className="pcard" threshold={0.08}>
                <Link to={`/projects/${p.id}`} className="pcard__link">
                  <span className="pcard__media">
                    <Picture
                      src={coverImage(p)}
                      alt={p.name[lang]}
                      className="pcard__img"
                      sizes="(max-width: 900px) 100vw, 58vw"
                      priority={i === 0}
                    />
                    <span className="pcard__scrim" aria-hidden="true" />
                    <span className={`status status--${p.status} pcard__status`}>
                      <span className="status__dot" aria-hidden="true" />
                      {t.projects.status[p.status]}
                    </span>
                  </span>

                  <span className="pcard__body">
                    <span className="pcard__no">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="pcard__name">{p.name[lang]}</h2>
                    <span className="pcard__loc">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                      </svg>
                      {p.location[lang]}
                    </span>
                    <p className="pcard__desc">{p.tagline[lang]}</p>

                    {p.priceFrom && (
                      <span className="pcard__price">{p.priceFrom[lang]}</span>
                    )}

                    {p.specs.length > 0 && (
                      <span className="pcard__specs">
                        {p.specs.slice(0, 3).map((s) => (
                          <span className="pcard__spec" key={s.label[lang]}>
                            <span className="pcard__spec-label">{s.label[lang]}</span>
                            <span className="pcard__spec-value">{s.value[lang]}</span>
                          </span>
                        ))}
                      </span>
                    )}

                    <span className="link-underline pcard__cta">
                      {t.projects.viewProject}
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>

          {shown.length === 0 && (
            <p className="projects__msg">{t.projects.emptyFilter}</p>
          )}
        </div>
      )}
    </main>
  );
}

export default Projects;
