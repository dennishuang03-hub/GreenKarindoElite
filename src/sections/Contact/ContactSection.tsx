import React, { useEffect, useRef, useState } from 'react';
import './ContactSection.css';
import '../../components/Contact.css';   // original ct-row, ct-ic, cl, cv, cs, ct-form, fld, ct-submit styles
import ContactForm from '../../components/ContactForm';
import ContactInfoRow from '../../components/ContactInfoRow';
import { useLang } from '../../i18n/LanguageContext';

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

const ClockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 1.75A10.25 10.25 0 1 0 22.25 12 10.26 10.26 0 0 0 12 1.75zm0 18.5A8.25 8.25 0 1 1 20.25 12 8.26 8.26 0 0 1 12 20.25zm.75-13h-1.5v5.19l4.22 2.53.78-1.28-3.5-2.09z"/>
  </svg>
);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Reveal once the section scrolls into view.
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
    <section
      ref={sectionRef}
      className={`contact${visible ? ' is-visible' : ''}`}
      id="contact"
    >
      <div className="wrap">
        <div className="contact-grid">

          {/* ---- Left column ---- */}
          <div className="ct-left">
            <div className="eyebrow gold">{t.contact.eyebrow}</div>
            <h2>
              {t.contact.titleLine1}<br />
              {t.contact.titleBrand}<span className="serif-em">{t.contact.titleEm}</span>
            </h2>
            <p>
              {t.contact.desc}
            </p>

            <div className="ct-info">
              <ContactInfoRow
                icon={<a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noopener noreferrer" className="fc-value-link"><WhatsAppIcon /></a>}
                label={t.contact.waLabel}
                value={<a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noopener noreferrer" className="fc-value-link">
                      +62 8xx-xxxx-xxxx</a>}
                sub={t.contact.waSub}
              />
              <ContactInfoRow
                icon={<a href="https://maps.google.com/?q=PT+Green+Karindo+Elite" target="_blank" rel="noopener noreferrer" className="fc-value-link"><LocationIcon /></a>}
                label={t.contact.officeLabel}
                value={<a href="https://maps.google.com/?q=PT+Green+Karindo+Elite" target="_blank" rel="noopener noreferrer" className="fc-value-link">
                      Ruko Kamboja no.25, Tanjung Balai Karimun</a>}
                sub={t.contact.officeSub}
              />
              <ContactInfoRow
                icon={<a href="https://maps.google.com/?q=PT+Green+Karindo+Elite" target="_blank" rel="noopener noreferrer" className="fc-value-link"><ClockIcon /></a>}
                label={t.contact.hoursLabel}
                value={t.contact.hoursValue}
              />
            </div>
          </div>

          {/* ---- Right column — Form ---- */}
          <ContactForm />

        </div>
      </div>
    </section>
  );
};

export default ContactSection;