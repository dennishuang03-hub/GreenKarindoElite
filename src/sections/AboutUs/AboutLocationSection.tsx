import { useLang } from "../../i18n/LanguageContext";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";
import { site, whatsappLink } from "../../config/site";

const GMAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d548.2141438119448!2d103.41819603591438!3d1.0103356292905825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d75b1f671c9a51%3A0x8f4c00414efb2008!2sPT%20Green%20Karindo%20Elite!5e1!3m2!1sen!2sus!4v1781253807730!5m2!1sen!2sus";

/** Marketing office: address, hours and contact beside the map. */
const AboutLocationSection = () => {
  const { t } = useLang();

  const rows = [
    { label: t.contact.officeLabel, value: site.address, href: site.mapUrl },
    { label: t.contact.waLabel, value: site.whatsappDisplay, href: whatsappLink() },
    { label: t.contact.hoursLabel, value: t.contact.hoursValue },
  ];

  return (
    <section className="loc section" id="our-location" aria-label={t.location.eyebrow}>
      <div className="container">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          titlePre={t.location.titlePre}
          titleEm={t.location.titleEm}
          lead={t.location.subtitle}
        />

        <div className="loc__grid">
          <Reveal variant="clip" className="loc__map" threshold={0.08}>
            <iframe
              src={GMAPS_EMBED}
              title={`${site.legalName} — ${t.location.eyebrow}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          <Reveal delay={120} className="loc__panel">
            <dl className="loc__rows">
              {rows.map((r) => (
                <div className="loc__row" key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              className="btn btn--primary btn--block"
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.location.directions}
              <svg className="btn__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutLocationSection;
