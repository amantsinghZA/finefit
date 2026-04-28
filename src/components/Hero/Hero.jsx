import { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';

const SLIDES = [
  {
    id: 'combat',
    eyebrow: 'Security · Combat',
    title: 'Battle-Ready',
    accent: 'Combat Uniforms',
    sub: 'Durable poly-cotton shirts, BDU cargo trousers, and combat jackets built for active security operations.',
    cta: 'Shop Combat',
    ctaNav: { category: 'security', subcategory: 'combat' },
    secondaryCta: 'All Security',
    secondaryNav: { category: 'security', subcategory: 'all' },
  },
  {
    id: 'stepout',
    eyebrow: 'Security · Step-Out',
    title: 'Smart. Professional.',
    accent: 'Step-Out Uniforms',
    sub: 'Corporate-cut shirts, formal trousers, and clip-on ties for front-of-house and corporate security roles.',
    cta: 'Shop Step-Out',
    ctaNav: { category: 'security', subcategory: 'stepout' },
    secondaryCta: 'All Security',
    secondaryNav: { category: 'security', subcategory: 'all' },
  },
  {
    id: 'accessories',
    eyebrow: 'Security · Accessories & Footwear',
    title: 'Complete Your',
    accent: 'Security Kit',
    sub: 'SWAT caps, rank slides, duty belts, and tactical boots — everything to finish the uniform with authority.',
    cta: 'Shop Accessories',
    ctaNav: { category: 'security', subcategory: 'accessories' },
    secondaryCta: 'Shop Footwear',
    secondaryNav: { category: 'security', subcategory: 'footwear' },
  },
  {
    id: 'embroidery',
    eyebrow: 'Custom Branding',
    title: 'Your Logo.',
    accent: 'Every Garment.',
    sub: 'Professional embroidery and custom branding on all uniform items. Bulk orders with fast turnaround nationwide.',
    cta: 'Request a Quote',
    ctaNav: null,                                                       // scrolls to #contact
    secondaryCta: 'View All Products',
    secondaryNav: { category: 'all', subcategory: 'all' },
  },
];

export default function Hero({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const handleCta = (nav) => {
    if (!nav) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    onNavigate(nav.category, nav.subcategory);
  };

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.overlay} />

      {/* Slide panels */}
      <div className={styles.slidesArea}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
            aria-hidden={i !== current}
          >
            <div className={`container ${styles.content}`}>
              <p className={styles.eyebrow}>{slide.eyebrow}</p>
              <h1 className={styles.title}>
                {slide.title}<br />
                <span className={styles.accent}>{slide.accent}</span>
              </h1>
              <p className={styles.sub}>{slide.sub}</p>
              <div className={styles.actions}>
                <button className={styles.btnPrimary} onClick={() => handleCta(slide.ctaNav)}>
                  {slide.cta}
                </button>
                <button className={styles.btnSecondary} onClick={() => handleCta(slide.secondaryNav)}>
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="Previous slide">
        &#8249;
      </button>
      <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="Next slide">
        &#8250;
      </button>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Trust strip — shared across all slides */}
      <div className={styles.trustWrap}>
        <div className="container">
          <div className={styles.trustRow}>
            <div className={styles.trustItem}><span className={styles.check}>✔</span> Bulk Orders Welcome</div>
            <div className={styles.trustItem}><span className={styles.check}>✔</span> Custom Branding</div>
            <div className={styles.trustItem}><span className={styles.check}>✔</span> Nationwide Delivery</div>
            <div className={styles.trustItem}><span className={styles.check}>✔</span> Price on Request</div>
          </div>
        </div>
      </div>
    </section>
  );
}
