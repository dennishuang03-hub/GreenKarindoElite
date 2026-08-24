import { useMemo, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import type { SitePlan as SitePlanData, UnitStatus } from "../../data/projects";
import { whatsappLink } from "../../config/site";
import Picture from "../../components/ui/Picture";
import Reveal from "../../components/ui/Reveal";
import "./SitePlan.css";

interface SitePlanProps {
  plan: SitePlanData;
  projectName: string;
}

const ORDER: UnitStatus[] = ["available", "booked", "sold"];

/**
 * Interactive master plan.
 *
 * Each plot in projects.json carries percentage geometry, so hotspots
 * scale with the drawing at any width. Hovering or focusing a plot
 * highlights it; selecting one opens its detail card with a WhatsApp
 * enquiry pre-filled with that plot number. Filtering by status dims
 * everything else, which is how a buyer actually shops: "show me what
 * is still available".
 */
const SitePlan = ({ plan, projectName }: SitePlanProps) => {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<UnitStatus | "all">("all");

  const counts = useMemo(() => {
    const base: Record<UnitStatus, number> = { available: 0, booked: 0, sold: 0 };
    for (const u of plan.units) base[u.status] += 1;
    return base;
  }, [plan.units]);

  const unit = plan.units.find((u) => u.id === selected) ?? null;

  return (
    <section className="plan section" id="site-plan" aria-label={t.sitePlan.title}>
      <div className="container">
        <div className="plan__head">
          <div>
            <span className="eyebrow">{t.sitePlan.eyebrow}</span>
            <h2 className="plan__title display-title">
              {plan.title ? plan.title[lang] : t.sitePlan.title}
            </h2>
          </div>

          {/* Legend doubles as the status filter. */}
          <div className="plan__legend" role="group" aria-label={t.sitePlan.legendLabel}>
            <button
              type="button"
              className={`plan__legend-btn${filter === "all" ? " plan__legend-btn--active" : ""}`}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              {t.sitePlan.all}
              <span className="plan__legend-count">{plan.units.length}</span>
            </button>

            {ORDER.map((s) => (
              <button
                key={s}
                type="button"
                className={`plan__legend-btn plan__legend-btn--${s}${filter === s ? " plan__legend-btn--active" : ""}`}
                aria-pressed={filter === s}
                onClick={() => setFilter(filter === s ? "all" : s)}
              >
                <span className="plan__swatch" aria-hidden="true" />
                {t.sitePlan.unitStatus[s]}
                <span className="plan__legend-count">{counts[s]}</span>
              </button>
            ))}
          </div>
        </div>

        <Reveal variant="clip" className="plan__frame" threshold={0.06}>
          <div className="plan__scroll">
            <div className="plan__canvas">
              <Picture
                src={plan.image}
                alt={`${projectName} — ${t.sitePlan.title}`}
                className="plan__img"
                sizes="(max-width: 1100px) 140vw, 90vw"
              />

              {plan.units.map((u) => {
                const dimmed = filter !== "all" && u.status !== filter;
                return (
                  <button
                    key={u.id}
                    type="button"
                    className={[
                      "plan__spot",
                      `plan__spot--${u.status}`,
                      selected === u.id ? "plan__spot--selected" : "",
                      dimmed ? "plan__spot--dim" : "",
                    ].filter(Boolean).join(" ")}
                    style={{
                      left: `${u.x}%`,
                      top: `${u.y}%`,
                      width: `${u.w}%`,
                      height: `${u.h}%`,
                    }}
                    aria-label={`${u.label} — ${t.sitePlan.unitStatus[u.status]}`}
                    aria-pressed={selected === u.id}
                    onClick={() => setSelected(selected === u.id ? null : u.id)}
                  >
                    <span className="plan__spot-label">{u.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="plan__hint">{t.sitePlan.hint}</p>
        </Reveal>

        {/* Selected plot detail */}
        {unit && (
          <div className="plan__card" role="status">
            <button
              type="button"
              className="plan__card-close"
              aria-label={t.projects.close}
              onClick={() => setSelected(null)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="plan__card-head">
              <span className="plan__card-no">{unit.label}</span>
              <span className={`status status--${unit.status === "available" ? "available" : unit.status === "sold" ? "sold" : "new-launch"}`}>
                <span className="status__dot" aria-hidden="true" />
                {t.sitePlan.unitStatus[unit.status]}
              </span>
            </div>

            <dl className="plan__card-specs">
              {unit.type && (
                <div>
                  <dt>{t.sitePlan.type}</dt>
                  <dd>{unit.type[lang]}</dd>
                </div>
              )}
              {unit.size && (
                <div>
                  <dt>{t.sitePlan.size}</dt>
                  <dd>{unit.size}</dd>
                </div>
              )}
              {unit.price && (
                <div>
                  <dt>{t.sitePlan.price}</dt>
                  <dd className="plan__card-price">{unit.price}</dd>
                </div>
              )}
            </dl>

            {unit.status === "available" ? (
              <a
                className="btn btn--primary btn--sm plan__card-cta"
                href={whatsappLink(
                  `${t.sitePlan.enquiryPrefix} ${unit.label} — ${projectName}`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.sitePlan.enquire}
              </a>
            ) : (
              <p className="plan__card-note">{t.sitePlan.takenNote}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SitePlan;
