/* ============================================================
   Hero Component
   Full-width banner with maroon/gold brand treatment.
   Replace heroImage with real lifestyle photography.
   ============================================================ */
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>Trusted South African Supplier</p>
        <h1 className={styles.title}>
          Professional Uniforms<br />
          <span className={styles.accent}>Built for the Field</span>
        </h1>
        <p className={styles.sub}>
          Security uniforms, PPE workwear, and custom embroidery — designed for
          South Africa's toughest environments. Bulk orders welcome.
        </p>
        <div className={styles.actions}>
          <a href="#security" className={styles.btnPrimary}>Shop Security</a>
          <a href="#ppe" className={styles.btnSecondary}>Shop PPE</a>
        </div>
        <div className={styles.trustRow}>
          <div className={styles.trustItem}><span className={styles.check}>✔</span> Bulk Orders Welcome</div>
          <div className={styles.trustItem}><span className={styles.check}>✔</span> Custom Branding</div>
          <div className={styles.trustItem}><span className={styles.check}>✔</span> Nationwide Delivery</div>
          <div className={styles.trustItem}><span className={styles.check}>✔</span> Price on Request</div>
        </div>
      </div>
    </section>
  );
}
