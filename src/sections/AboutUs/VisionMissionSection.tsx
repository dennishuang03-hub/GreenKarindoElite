import { useLang } from "../../i18n/LanguageContext";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";

/**
 * Vision and mission. The vision sits in a quiet display-type panel;
 * the missions run beneath it as a numbered list on hairlines.
 */
const VisionMissionSection = () => {
  const { t } = useLang();

  return (
    <section
      className="vm section section--ink"
      id="vision-mission"
      aria-label={t.vm.eyebrow}
    >
      <div className="container">
        <div className="vm__grid">
          <div className="vm__aside">
            <SectionHeading
              eyebrow={t.vm.eyebrow}
              titlePre={t.vm.titlePre}
              titleEm={t.vm.titleEm}
            />

            <Reveal delay={140} className="vm__vision">
              <span className="vm__vision-label">{t.vm.visionLabel}</span>
              <p className="vm__vision-text">{t.vm.vision}</p>
            </Reveal>
          </div>

          <div className="vm__missions">
            <Reveal as="span" className="vm__missions-label">
              {t.vm.missionLabel}
            </Reveal>
            <ol className="vm__list">
              {t.vm.missions.map((m, i) => (
                <Reveal as="li" key={m} delay={i * 70} className="vm__item">
                  <span className="vm__no">{String(i + 1).padStart(2, "0")}</span>
                  <p className="vm__text">{m}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
