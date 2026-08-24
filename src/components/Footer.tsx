import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/Logo.webp";
import { useLang } from "../i18n/LanguageContext";
import { useProjects } from "../data/projects";
import { site, whatsappLink } from "../config/site";
import Reveal from "./ui/Reveal";

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.37-.22-3.87 1.02 1.03-3.77-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52H6.9c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.14.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

const Footer = () => {
  const { lang, t } = useLang();
  const { projects } = useProjects();

  const companyLinks = [
    { label: t.nav.profile, to: "/about#about-hero" },
    { label: t.nav.vision, to: "/about#vision-mission" },
    { label: t.nav.visit, to: "/about#our-location" },
    { label: t.nav.contact, to: "/contact" },
  ];

  return (
    <footer className="foot">
      <div className="container">
        {/* ── Call to action ── */}
        <Reveal className="foot__cta" threshold={0.1}>
          <div className="foot__cta-text">
            <span className="eyebrow">{t.footer.contactEyebrow}</span>
            <h2 className="foot__cta-title">
              {t.footer.marketingTeam}
              <br />
              <em>{t.footer.marketingPlace}</em>
            </h2>
            <p className="foot__cta-desc">{t.footer.desc}</p>
          </div>

          <a
            className="foot__phone"
            href={whatsappLink(t.contact.waPrefill)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="foot__phone-label">{t.footer.waLabel}</span>
            <span className="foot__phone-value">
              <WhatsAppIcon />
              {site.whatsappDisplay}
            </span>
          </a>
        </Reveal>

        {/* ── Link columns ── */}
        <div className="foot__cols">
          <div className="foot__col foot__col--brand">
            <Link to="/" className="foot__brand">
              <img src={logo} alt="" className="foot__mark" width={48} height={48} />
              <span className="foot__brand-text">
                <span className="foot__brand-name">Green Karindo Elite</span>
                <span className="foot__brand-role">{t.footer.developerRole}</span>
              </span>
            </Link>
            <p className="foot__slogan">{site.tagline}</p>
            <address className="foot__addr">
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {site.address}
              </a>
              <span>{site.addressRegion}</span>
            </address>
          </div>

          <nav className="foot__col" aria-label={t.nav.project}>
            <h3 className="foot__col-title">{t.nav.project}</h3>
            <ul className="foot__links">
              {(projects ?? []).map((p) => (
                <li key={p.id}>
                  <Link to={`/projects/${p.id}`}>{p.name[lang]}</Link>
                </li>
              ))}
              <li>
                <Link to="/projects">{t.featured.viewAll}</Link>
              </li>
            </ul>
          </nav>

          <nav className="foot__col" aria-label={t.nav.about}>
            <h3 className="foot__col-title">{t.nav.about}</h3>
            <ul className="foot__links">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot__col">
            <h3 className="foot__col-title">{t.footer.followEyebrow}</h3>
            <p className="foot__follow">{t.footer.followDesc}</p>
            <div className="foot__social">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="foot__social-btn">
                <InstagramIcon />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="foot__social-btn">
                <FacebookIcon />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="foot__social-btn">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ── Legal ── */}
        <div className="foot__bottom">
          <span>{t.footer.copyright}</span>
          <span className="foot__disclaimer">{t.footer.disclaimer}</span>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge. */}
      <span className="foot__watermark" aria-hidden="true">Green Karindo</span>
    </footer>
  );
};

export default Footer;
