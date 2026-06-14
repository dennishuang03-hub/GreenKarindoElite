import { useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { useProjects } from "../data/projects";
import ProjectSection from "../sections/Projects/ProjectSection";
import "../sections/Projects/Projects.css";

function Projects() {
  const { t } = useLang();
  const { projects, error } = useProjects();

  // Scroll to the section named in the URL hash (e.g. /projects#sea-view-karimun)
  // once the projects have loaded and their sections exist in the DOM.
  useEffect(() => {
    if (!projects) return;
    const { hash } = window.location;
    if (!hash) return;
    const t0 = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t0);
  }, [projects]);

  // Re-run on hash changes while already on the page.
  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <main className="projects-page">
      {/* ── Page header ── */}
      <header className="projects-hero">
        <div className="projects-hero__inner">
          <div className="projects-hero__eyebrow">{t.projects.eyebrow}</div>
          <h1 className="projects-hero__title">
            {t.projects.titlePre}
            <em>{t.projects.titleEm}</em>
          </h1>
          <p className="projects-hero__intro">{t.projects.intro}</p>
        </div>
      </header>

      {/* ── States ── */}
      {projects === null && !error && (
        <p className="projects-status-msg">{t.projects.loading}</p>
      )}

      {(error || (projects && projects.length === 0)) && (
        <p className="projects-status-msg">{t.projects.empty}</p>
      )}

      {/* ── One full section per project ── */}
      {projects &&
        projects.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
    </main>
  );
}

export default Projects;
