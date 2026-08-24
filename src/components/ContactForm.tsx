import { useState } from "react";
import type { FormEvent } from "react";
import { useLang } from "../i18n/LanguageContext";
import { useProjects } from "../data/projects";
import { submitLead, leadWhatsappLink, isValidPhone, type LeadInput } from "../lib/leads";

type State = "idle" | "sending" | "sent";

/**
 * Survey-request form.
 *
 * Submissions are written to Supabase and the visitor is then offered
 * a pre-filled WhatsApp message, so a lead survives even if the
 * database write fails. A hidden honeypot field catches the simplest
 * bots without putting a captcha in a buyer's way.
 */
const ContactForm = () => {
  const { lang, t } = useLang();
  const { projects } = useProjects();

  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [lead, setLead] = useState<LeadInput | null>(null);

  const projectOptions = (projects ?? []).map((p) => p.name[lang]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never fills a field they cannot see.
    if ((data.get("company") as string)?.trim()) return;

    const next: LeadInput = {
      name: (data.get("name") as string) ?? "",
      phone: (data.get("phone") as string) ?? "",
      project: (data.get("project") as string) ?? "",
      scheme: (data.get("scheme") as string) ?? "",
      message: (data.get("message") as string) ?? "",
      source: "contact-form",
      lang,
    };

    const invalid = {
      name: !next.name.trim(),
      phone: !isValidPhone(next.phone),
    };

    if (invalid.name || invalid.phone) {
      setErrors(invalid);
      return;
    }

    setErrors({});
    setState("sending");

    await submitLead(next);

    setLead(next);
    setState("sent");
    form.reset();
  }

  if (state === "sent" && lead) {
    return (
      <div className="cform cform--sent" role="status">
        <span className="cform__tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="cform__title">{t.form.successTitle}</h3>
        <p className="cform__sub">{t.form.successDesc}</p>

        <a
          className="btn btn--primary btn--block"
          href={leadWhatsappLink(lead)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.form.successWhatsapp}
        </a>

        <button
          type="button"
          className="cform__again"
          onClick={() => {
            setState("idle");
            setLead(null);
          }}
        >
          {t.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <h3 className="cform__title">{t.form.title}</h3>
      <p className="cform__sub">{t.form.subtitle}</p>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="cform__trap" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={`fld${errors.name ? " fld--error" : ""}`}>
        <label htmlFor="name">{t.form.nameLabel}</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t.form.namePlaceholder}
          aria-invalid={errors.name || undefined}
          onChange={() => errors.name && setErrors((p) => ({ ...p, name: false }))}
        />
        {errors.name && <span className="fld__error">{t.form.errorName}</span>}
      </div>

      <div className={`fld${errors.phone ? " fld--error" : ""}`}>
        <label htmlFor="phone">{t.form.whatsappLabel}</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="08xx-xxxx-xxxx"
          aria-invalid={errors.phone || undefined}
          onChange={() => errors.phone && setErrors((p) => ({ ...p, phone: false }))}
        />
        {errors.phone && <span className="fld__error">{t.form.errorPhone}</span>}
      </div>

      <div className="fld">
        <label htmlFor="project">{t.form.projectLabel}</label>
        <select id="project" name="project" defaultValue={projectOptions[0] ?? ""}>
          {projectOptions.length === 0 && <option>{t.form.projectFallback}</option>}
          {projectOptions.map((name) => (
            <option key={name}>{name}</option>
          ))}
          <option>{t.form.projectOther}</option>
        </select>
      </div>

      <div className="fld">
        <label htmlFor="scheme">{t.form.schemeLabel}</label>
        <select id="scheme" name="scheme" defaultValue={t.form.schemeOptions[0]}>
          {t.form.schemeOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="fld">
        <label htmlFor="message">{t.form.messageLabel}</label>
        <textarea id="message" name="message" rows={4} placeholder={t.form.messagePlaceholder} />
      </div>

      <button type="submit" className="btn btn--primary btn--block cform__submit" disabled={state === "sending"}>
        {state === "sending" ? t.form.sending : t.form.submit}
        {state !== "sending" && (
          <svg className="btn__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <p className="cform__note">{t.form.privacy}</p>
    </form>
  );
};

export default ContactForm;
