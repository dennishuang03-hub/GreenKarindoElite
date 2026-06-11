// import React from 'react';
import '../components/Contact.css';
import ContactInfoRow from '../components/ContactInfoRow';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">

          {/* ---- Left column ---- */}
          <div className="ct-left">
            <div className="eyebrow gold">Hubungi Kami</div>
            <h2>
              Marketing Team<br />
              Green karindo <span className="serif-em">Elite.</span>
            </h2>
            <p>
              Tim pemasaran kami siap membantu Anda — dari konsultasi awal,
              survei lokasi, hingga proses akad.
            </p>

            <div className="ct-info">
              <ContactInfoRow
                icon="✆"
                label="WhatsApp"
                value="+62 8xx-xxxx-xxxx"
                sub="Marketing Team Sea View"
              />
              <ContactInfoRow
                icon="⌖"
                label="Kantor Pemasaran"
                value="Ruko Kamboja No. 25, Tanjung Balai Karimun"
                sub="Kepulauan Riau, Indonesia"
              />
              <ContactInfoRow
                icon="◷"
                label="Jam Operasional"
                value="Senin – Sabtu · 08.00 – 17.00 WIB"
              />
            </div>
          </div>

          {/* ---- Right column — Form ---- */}
          <ContactForm />

        </div>
      </div>
    </section>
  );
}

export default Contact;
