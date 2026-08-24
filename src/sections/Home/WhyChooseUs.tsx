import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";
import "./WhyChooseUs.css";

// One icon per value prop, paired by index with the translated items.
const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const QualityIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M6 3h12l3 5-9 13L3 8l3-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M3 8h18M9 3l-1.5 5L12 21l4.5-13L15 3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const LegalIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PaymentIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 14h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ICONS = [ExperienceIcon, QualityIcon, LegalIcon, PaymentIcon];

/**
 * Value propositions as a numbered editorial list, followed by the
 * site-visit call to action.
 */
const WhyChooseUs = () => {
  const { t } = useLang();

  return (
    <section className="why section" aria-label={t.why.eyebrow}>
      <div className="container">
        <div className="why__grid">
          <div className="why__aside">
            <SectionHeading
              index="02"
              eyebrow={t.why.eyebrow}
              titlePre={t.why.titlePre}
              titleEm={t.why.titleEm}
              lead={t.why.lead}
            />
          </div>

          <ol className="why__list">
            {t.why.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal as="li" key={item.title} delay={i * 90} className="why__item">
                  <span className="why__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="why__icon"><Icon /></span>
                  <div className="why__text">
                    <h3 className="why__title">{item.title}</h3>
                    <p className="why__desc">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ── Visit call to action ── */}
      <div className="container">
        <Reveal className="visit" threshold={0.1}>
          <div className="visit__inner">
            <div className="visit__text">
              <span className="eyebrow">{t.visitCta.eyebrow}</span>
              <h3 className="visit__title">{t.visitCta.title}</h3>
              <p className="visit__desc">{t.visitCta.desc}</p>
            </div>
            <Link to="/contact" className="btn btn--primary visit__btn">
              {t.visitCta.button}
              <svg className="btn__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyChooseUs;
