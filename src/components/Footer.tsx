import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';
import logo from '../assets/Logo.png';
import { useLang } from '../i18n/LanguageContext';

// ─── Social links — edit these with your real profiles ──────────────────────
const INSTAGRAM_URL = 'https://instagram.com/greenkarindoelite';
const FACEBOOK_URL  = 'https://facebook.com/greenkarindoelite';
const WHATSAPP_URL  = 'https://wa.me/6281389082292';

// ─── Icons ────────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.37-.22-3.87 1.02 1.03-3.77-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52H6.9c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.14.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

// ─── Small reusable contact row ────────────────────────────────────────────
interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
}

const ContactRow: React.FC<ContactRowProps> = ({ icon, label, value, sub }) => (
  <div className="fc-row">
    <div className="fc-ic">{icon}</div>
    <div>
      <div className="fc-label">{label}</div>
      <div className="fc-value">{value}</div>
      {sub && <div className="fc-sub">{sub}</div>}
    </div>
  </div>
);

// ─── Main Footer ───────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    // Reveal once the footer scrolls into view.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`footer${visible ? ' is-visible' : ''}`}
    >
      <div className="wrap">

        {/* ── Contact info section ── */}
        <div className="foot-contact">

          {/* Col 1 — Hubungi Kami */}
          <div className="fc-brand">
            <div className="fc-eyebrow">{t.footer.contactEyebrow}</div>
            <h3 className="fc-heading">
              <span className="fc-heading-em">{t.footer.marketingTeam}</span><br />
              {t.footer.marketingPlace}
            </h3>
            <p className="fc-desc">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 2 — Detail Kontak */}
          <div className="fc-details">
            <div className="fc-eyebrow">{t.footer.detailEyebrow}</div>
            <ContactRow
              icon={<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fc-value-link">
              <WhatsAppIcon /></a>}
              label={t.footer.waLabel}
              value={
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fc-value-link">
                  +62 81389082292
                </a>
              }
            />
            <ContactRow
              icon={<a href="https://maps.google.com/?q=PT+Green+Karindo+Elite" target="_blank" rel="noopener noreferrer" className="fc-value-link">
                <LocationIcon /></a>}
              label={t.footer.addressLabel}
              value={<a href="https://maps.google.com/?q=PT+Green+Karindo+Elite" target="_blank" rel="noopener noreferrer" className="fc-value-link">
                      Ruko Kamboja no.25, Tanjung Balai Karimun</a>}
              sub={t.footer.addressSub}
            />
          </div>

          {/* Col 3 — Ikuti Kami / Social media */}
          <div className="fc-social">
            <div className="fc-eyebrow">{t.footer.followEyebrow}</div>
            <p className="fc-social-desc">
              {t.footer.followDesc}
            </p>
            <div className="fc-social-links">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fc-social-btn"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fc-social-btn"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

        </div>

        {/* ── Brand row ── */}
        <div className="foot-top">
          <div className="foot-dev">
            <span className="fd-mark">
              <img src={logo} alt="Green Karindo Elite Logo" />
            </span>
            <div className="fd-t">
              <div className="l">{t.footer.developerLabel}</div>
              <div className="n">Green Karindo Elite</div>
              <div className="r">{t.footer.developerRole}</div>
            </div>
          </div>
          <div className="foot-slogan">
            {/* Slogan intentionally left untranslated per request */}
            <div className="fs-1">Your Home Above the Horizon.</div>
          </div>
        </div>

        {/* ── Copyright row ── */}
        <div className="foot-bot">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.disclaimer}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;