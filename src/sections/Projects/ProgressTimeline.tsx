import { useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import type { ProjectProgress } from "../../data/projects";
import { useReveal } from "../../lib/useReveal";
import { formatMilestoneDate } from "../../lib/format";
import Reveal from "../../components/ui/Reveal";
import Picture from "../../components/ui/Picture";
import Lightbox from "../../components/ui/Lightbox";
import "./ProgressTimeline.css";

interface ProgressTimelineProps {
  progress: ProjectProgress;
  projectName: string;
}

/**
 * Construction progress.
 *
 * An overall completion meter that fills once it scrolls into view,
 * followed by dated milestones. Buyers of an unfinished unit check
 * this more often than anything else on the site, so each milestone
 * can carry its own photos, opening in the shared lightbox.
 */
const ProgressTimeline = ({ progress, projectName }: ProgressTimelineProps) => {
  const { lang, t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.3 });
  const [zoom, setZoom] = useState<{ images: string[]; index: number } | null>(null);

  const overall = Math.max(0, Math.min(100, progress.overall));

  return (
    <section className="prog section section--ink" id="progress" aria-label={t.progress.title}>
      <div className="container">
        <div className="prog__head">
          <div>
            <span className="eyebrow">{t.progress.eyebrow}</span>
            <h2 className="prog__title display-title">{t.progress.title}</h2>
            {progress.updated && (
              <p className="prog__updated">
                {t.progress.updated} {formatMilestoneDate(progress.updated, lang)}
              </p>
            )}
          </div>

          <div className="prog__meter" ref={ref}>
            <div className="prog__meter-top">
              <span className="prog__meter-label">{t.progress.overall}</span>
              <span className="prog__meter-value">
                {visible ? overall : 0}
                <span className="prog__meter-pct">%</span>
              </span>
            </div>
            <div className="prog__bar">
              <span
                className="prog__bar-fill"
                style={{ transform: `scaleX(${visible ? overall / 100 : 0})` }}
              />
            </div>
          </div>
        </div>

        <ol className="prog__list">
          {progress.milestones.map((m, i) => (
            <Reveal
              as="li"
              key={`${m.date}-${i}`}
              delay={i * 70}
              className={`prog__item prog__item--${m.status}`}
            >
              <div className="prog__marker" aria-hidden="true">
                <span className="prog__dot" />
              </div>

              <div className="prog__content">
                <div className="prog__meta">
                  <time className="prog__date">{formatMilestoneDate(m.date, lang)}</time>
                  <span className="prog__status">{t.progress.status[m.status]}</span>
                  {typeof m.percent === "number" && (
                    <span className="prog__percent">{m.percent}%</span>
                  )}
                </div>

                <h3 className="prog__name">{m.title[lang]}</h3>
                {m.description && <p className="prog__desc">{m.description[lang]}</p>}

                {m.images && m.images.length > 0 && (
                  <div className="prog__shots">
                    {m.images.map((src, j) => (
                      <button
                        key={src}
                        type="button"
                        className="prog__shot"
                        aria-label={`${m.title[lang]} — ${j + 1}`}
                        onClick={() => setZoom({ images: m.images!, index: j })}
                      >
                        <Picture src={src} alt="" className="prog__shot-img" sizes="220px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {zoom && (
        <Lightbox
          images={zoom.images}
          startIndex={zoom.index}
          alt={`${projectName} — ${t.progress.title}`}
          onClose={() => setZoom(null)}
          labels={{
            prev: t.projects.galleryPrev,
            next: t.projects.galleryNext,
            close: t.projects.close,
          }}
        />
      )}
    </section>
  );
};

export default ProgressTimeline;
