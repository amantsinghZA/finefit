/* ============================================================
   Footer Component
   ============================================================ */
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.grid}>

          {/* Brand col */}
          <div className={styles.brand}>
            <img src="/logo.webp" alt="Fine Fit Uniform and Overall cc" className={styles.logo} />
            <p className={styles.tagline}>Manufacturers of Mens &amp; Ladies Military / Corporate Uniforms</p>
            <p className={styles.about}>
              Fine Fit Uniform and Overall cc has been supplying professional security uniforms, PPE, and
              corporate workwear to South African businesses for over 20 years.
            </p>
          </div>

          {/* Products col */}
          <div className={styles.col} id="about">
            <h4 className={styles.colTitle}>Products</h4>
            <ul className={styles.colLinks}>
              <li>Combat Uniform</li>
              <li>Step-Out Uniform</li>
              <li>Security Accessories</li>
              <li>Security Footwear</li>
              <li>Core Workwear</li>
              <li>PPE Accessories</li>
            </ul>
          </div>

          {/* Contact col */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>52 Raebor Road, Benrose, Johannesburg</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+27746461491">+27 74 646 1491</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:info@finefit.co.za">info@finefit.co.za</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:orders@finefit.co.za">orders@finefit.co.za</a>
              </div>
            </div>
            <div className={styles.hours}>
              <div className={styles.hoursRow}><span>Mon – Thu</span><span>08:00 – 16:00</span></div>
              <div className={styles.hoursRow}><span>Friday</span><span>08:00 – 15:00</span></div>
              <div className={styles.hoursRow}><span>Sat / Sun</span><span style={{color:'rgba(255,255,255,0.3)'}}>Closed</span></div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Fine Fit Uniform and Overall cc. All rights reserved.</p>
          <p>Reg. No. &nbsp;|&nbsp; VAT Reg. No. (to be added)</p>
        </div>
      </div>
    </footer>
  );
}
