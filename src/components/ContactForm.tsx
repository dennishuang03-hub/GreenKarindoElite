import React, { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="ct-form" onSubmit={handleSubmit}>
      <h3>{t.form.title}</h3>
      <p>{t.form.subtitle}</p>

      <div className="fld">
        <label htmlFor="nama">{t.form.nameLabel}</label>
        <input id="nama" type="text" placeholder={t.form.namePlaceholder} required />
      </div>

      <div className="fld">
        <label htmlFor="whatsapp">{t.form.whatsappLabel}</label>
        <input id="whatsapp" type="tel" placeholder="08xx-xxxx-xxxx" required />
      </div>

      <div className="fld">
        <label htmlFor="proyek">{t.form.projectLabel}</label>
        <select id="proyek">
          <option>Sea View — Bukit Indah Karimun</option>
          <option>Bukit Indah — Lubuk Semut</option>
        </select>
      </div>

      <div className="fld">
        <label htmlFor="skema">{t.form.schemeLabel}</label>
        <select id="skema">
          {t.form.schemeOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="fld">
        <label htmlFor="pesan">{t.form.messageLabel}</label>
        <textarea id="pesan" placeholder={t.form.messagePlaceholder} />
      </div>

      <button
        type="submit"
        className="ct-submit"
        style={submitted ? { background: '#7a9e6a' } : undefined}
      >
        {submitted ? t.form.submitted : t.form.submit}
      </button>
    </form>
  );
}

export default ContactForm;
