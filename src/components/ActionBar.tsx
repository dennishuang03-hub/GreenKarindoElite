import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { site, whatsappLink } from "../config/site";
import "./ActionBar.css";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.37-.22-3.87 1.02 1.03-3.77-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52H6.9c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.14.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
  </svg>
);

const PinIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Persistent contact affordance.
 *
 * On desktop it is a single WhatsApp pill in the bottom-right corner
 * that appears once the visitor has scrolled past the hero. On mobile
 * it becomes a three-action bar pinned to the bottom of the screen,
 * where the thumb already is — chat, directions, book a visit.
 */
const ActionBar = () => {
  const { t } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chat = whatsappLink(t.contact.waPrefill);

  return (
    <>
      {/* Desktop pill */}
      <a
        className={`wafab${shown ? " wafab--shown" : ""}`}
        href={chat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.wa.label}
      >
        <span className="wafab__icon">
          <WhatsAppIcon />
        </span>
        <span className="wafab__label">{t.wa.label}</span>
      </a>

      {/* Mobile action bar */}
      <nav className="abar" aria-label={t.wa.barLabel}>
        <a className="abar__item" href={site.mapUrl} target="_blank" rel="noopener noreferrer">
          <PinIcon />
          <span>{t.wa.directions}</span>
        </a>

        <a
          className="abar__item abar__item--primary"
          href={chat}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>{t.wa.chat}</span>
        </a>

        <Link className="abar__item" to="/contact">
          <CalendarIcon />
          <span>{t.wa.visit}</span>
        </Link>
      </nav>
    </>
  );
};

export default ActionBar;
