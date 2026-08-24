import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useSeo } from "../lib/useSeo";
import "./NotFound.css";

/** Shown for unknown routes and for project slugs that do not exist. */
const NotFound = () => {
  const { t } = useLang();

  useSeo({ title: t.notFound.title, description: t.notFound.desc });

  return (
    <main className="nf" id="main">
      <div className="container nf__inner">
        <span className="nf__code" aria-hidden="true">404</span>
        <span className="eyebrow">{t.notFound.eyebrow}</span>
        <h1 className="nf__title">{t.notFound.title}</h1>
        <p className="nf__desc">{t.notFound.desc}</p>
        <div className="nf__actions">
          <Link to="/" className="btn btn--primary">{t.notFound.home}</Link>
          <Link to="/projects" className="btn btn--ghost-ink">{t.notFound.projects}</Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
