import React from 'react';
import './Footer.css';
import logo from '../assets/Logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-dev">
            <span className="fd-mark">
              <img src={logo} alt="Green Karindo Elite Logo" />
            </span>
            <div className="fd-t">
              <div className="l">Developer</div>
              <div className="n">Green Karindo Elite</div>
              <div className="r">Kontraktor &amp; Developer</div>
            </div>
          </div>

          <div className="foot-slogan">
            <div className="fs-1">Your Home Above the Horizon.</div>
            {/* <div className="fs-2">Sea View · Bukit Indah Karimun</div> */}
          </div>
        </div>

        <div className="foot-bot">
          <span>© 2026 Green Karindo Elite. Seluruh hak cipta dilindungi.</span>
          <span>Spesifikasi, harga, dan ilustrasi bersifat indikatif dan dapat berubah.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
