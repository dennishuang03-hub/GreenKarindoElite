import { useLang } from "../../i18n/LanguageContext";
import "./WhyChooseUs.css";

// One icon per value prop (paired by index with the translated items).
const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const QualityIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M6 3h12l3 5-9 13L3 8l3-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 8h18M9 3l-1.5 5L12 21l4.5-13L15 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const LegalIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PaymentIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ICONS = [ExperienceIcon, QualityIcon, LegalIcon, PaymentIcon];

const WhyChooseUs = () => {
  const { t } = useLang();

  return (
    <section className="why" aria-label="Why choose us">
      <div className="why__inner">
        <div className="why__head">
          <div className="why__eyebrow">{t.why.eyebrow}</div>
          <h2 className="why__title">
            {t.why.titlePre}
            <em>{t.why.titleEm}</em>
          </h2>
        </div>

        <div className="why__grid">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article className="why__card" key={item.title}>
                <span className="why__icon">
                  <Icon />
                </span>
                <h3 className="why__card-title">{item.title}</h3>
                <p className="why__card-desc">{item.desc}</p>
              </article>
            );
          })}
        </div>

        {/* Visit CTA banner */}
        <div className="why__cta">
          <div className="why__cta-text">
            <div className="why__cta-eyebrow">{t.visitCta.eyebrow}</div>
            <h3 className="why__cta-title">{t.visitCta.title}</h3>
            <p className="why__cta-desc">{t.visitCta.desc}</p>
          </div>
          <a className="why__cta-btn" href="/contact">
            {t.visitCta.button}
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
