import React, { useState } from 'react';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="ct-form" onSubmit={handleSubmit}>
      <h3>Jadwalkan Survei Lokasi</h3>
      <p>Isi formulir berikut, tim kami akan segera menghubungi Anda.</p>

      <div className="fld">
        <label htmlFor="nama">Nama Lengkap</label>
        <input id="nama" type="text" placeholder="Nama Anda" required />
      </div>

      <div className="fld">
        <label htmlFor="whatsapp">Nomor WhatsApp</label>
        <input id="whatsapp" type="tel" placeholder="08xx-xxxx-xxxx" required />
      </div>

      <div className="fld">
        <label htmlFor="proyek">Proyek yang Diminati</label>
        <select id="proyek">
          <option>Sea View — Bukit Indah Karimun</option>
          <option>Bukit Indah — Lubuk Semut</option>
        </select>
      </div>

      <div className="fld">
        <label htmlFor="skema">Skema Pembayaran</label>
        <select id="skema">
          <option>DP 0% — Zero Down Payment</option>
          <option>Cash Bertahap</option>
          <option>KPR / Bank</option>
        </select>
      </div>

      <div className="fld">
        <label htmlFor="pesan">Pesan</label>
        <textarea id="pesan" placeholder="Tuliskan pertanyaan Anda..." />
      </div>

      <button
        type="submit"
        className="ct-submit"
        style={submitted ? { background: '#7a9e6a' } : undefined}
      >
        {submitted ? 'Pesan Terkirim ✓' : 'Kirim Permintaan Survei'}
      </button>
    </form>
  );
}

export default ContactForm;
