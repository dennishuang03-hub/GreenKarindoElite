import { useLang } from "../../i18n/LanguageContext";
import Reveal from "../../components/ui/Reveal";
import storyImage from "../../assets/AboutHero.webp";
import { site } from "../../config/site";

/**
 * Founding story — the company paragraph set as an editorial spread
 * with the founding year as an oversized display numeral.
 */
const AboutStory = () => {
  const { t } = useLang();

  return (
    <section className="story section" id="about-hero" aria-label={t.aboutHero.eyebrow}>
      <div className="container story__grid">
        <Reveal variant="clip" className="story__media" threshold={0.08}>
          <img src={storyImage} alt="" className="story__img" loading="lazy" decoding="async" />
          <span className="story__badge">
            <span className="story__badge-label">{t.aboutHero.sinceLabel}</span>
            <span className="story__badge-year">{site.foundedYear}</span>
          </span>
        </Reveal>

        <div className="story__text">
          <Reveal as="span" className="eyebrow">{t.aboutHero.tagline}</Reveal>

          <Reveal as="h2" delay={80} className="story__title">
            PT. Green Karindo <em>Elite.</em>
          </Reveal>

          <Reveal as="p" delay={160} className="story__body">
            {t.aboutHero.bodyBefore}
            <span className="story__name">{t.aboutHero.bodyName}</span>
            {t.aboutHero.bodyAfter}
          </Reveal>

          <Reveal delay={240} className="story__facts">
            {t.aboutHero.facts.map((f) => (
              <div className="story__fact" key={f.label}>
                <span className="story__fact-value">{f.value}</span>
                <span className="story__fact-label">{f.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
