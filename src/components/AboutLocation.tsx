import React, { useEffect, useRef, useState } from 'react';
import './AboutLocation.css';

// ─── Google Maps embed ─────────────────────────────────────────────────────
const GMAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d548.2141438119448!2d103.41819603591438!3d1.0103356292905825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d75b1f671c9a51%3A0x8f4c00414efb2008!2sPT%20Green%20Karindo%20Elite!5e1!3m2!1sen!2sus!4v1781253807730!5m2!1sen!2sus";

// ─── About Location ───────────────────────────────────────────────────────────
const AboutLocation: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

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
      className={`al-section${visible ? ' is-visible' : ''}`}
      id="location"
      aria-label="Office Location"
    >
      <div className="al-wrap">

        {/* Header */}
        <div className="al-header">
          <div className="al-eyebrow">Lokasi Kami</div>
          <h2 className="al-title">
            Kantor <em>Pemasaran</em>
          </h2>
          <p className="al-subtitle">
            Kunjungi kantor pemasaran kami untuk konsultasi langsung,
            atau hubungi tim kami untuk mengatur jadwal survei lokasi.
          </p>
        </div>

        {/* Map */}
        <div className="al-map">
          <div className="al-map-frame">
            <iframe
              src={GMAPS_EMBED}
              title="Lokasi Kantor Pemasaran Green Karindo Elite"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutLocation;