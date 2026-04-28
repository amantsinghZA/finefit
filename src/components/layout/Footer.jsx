import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import './Footer.css';

const WA_NUMBER = '27746461491';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo-name">Fine Fit</div>
          <div className="footer-logo-sub">Uniform &amp; Overall cc</div>
          <p className="footer-about">
            South Africa's trusted supplier of professional security uniforms,
            PPE workwear, and custom-branded garments. Proudly serving the
            security and industrial sectors for over 30 years.
          </p>
        </div>

        {/* Products */}
        <div className="footer-col">
          <h4>Security</h4>
          <ul>
            <li>Combat Uniform</li>
            <li>Step-Out Uniform</li>
            <li>Security Accessories</li>
            <li>Security Footwear</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>PPE</h4>
          <ul>
            <li>Protective Clothing</li>
            <li>Head Protection</li>
            <li>Safety Footwear</li>
            <li>PPE Accessories</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col footer-contact">
          <h4>Store Info</h4>
          <div className="contact-row">
            <MapPin size={14} />
            <span>52 Raebor Road, Benrose, Johannesburg</span>
          </div>
          <div className="contact-row">
            <Clock size={14} />
            <div>
              <div>Mon – Thu: 08:00 – 16:00</div>
              <div>Friday: 08:00 – 15:00</div>
            </div>
          </div>
          <div className="contact-row">
            <Phone size={14} />
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              +27 74 646 1491
            </a>
          </div>
          <div className="contact-row">
            <Mail size={14} />
            <a href="mailto:info@finefit.co.za">info@finefit.co.za</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Fine Fit Uniform &amp; Overall cc. All rights reserved.</span>
          <span className="footer-credit">Website by Aman Singh Consulting</span>
        </div>
      </div>
    </footer>
  );
}
