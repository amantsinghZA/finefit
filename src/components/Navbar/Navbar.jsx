/* ============================================================
   Navbar Component
   Sticky header with logo, search bar, and quote cart button.
   The top bar shows trading hours and contact number.
   ============================================================ */
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ cartCount, onCartOpen, onSearch, searchQuery, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Announcement / info bar */}
      <div className={styles.topBar}>
        <span>Manufacturers of Mens &amp; Ladies Military / Corporate Uniforms</span>
        <span>Mon–Thu: 08:00–16:00 &nbsp;|&nbsp; Fri: 08:00–15:00 &nbsp;|&nbsp; +27 74 646 1491</span>
      </div>

      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navInner}>

            {/* Approved logo - DO NOT REPLACE WITHOUT PO CONSENT */}
            <a href="/" className={styles.logoWrap} aria-label="Fine Fit Home">
              <img src="/logo.webp" alt="Fine Fit Uniform and Overall cc" className={styles.logo} />
            </a>

            {/* Desktop links */}
            <ul className={styles.navLinks}>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); onNavigate('security'); }}>Security</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); onNavigate('ppe'); }}>PPE</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            {/* Search */}
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search products…"
                className={styles.searchInput}
                value={searchQuery}
                onChange={e => onSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>

            {/* Quote cart trigger */}
            <button className={styles.cartBtn} onClick={onCartOpen} aria-label={`Quote cart, ${cartCount} items`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>Quote Cart</span>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            {/* Mobile hamburger */}
            <button className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={() => setMobileMenuOpen(v => !v)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#products" onClick={(e) => { e.preventDefault(); onNavigate('security'); setMobileMenuOpen(false); }}>Security</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); onNavigate('ppe'); setMobileMenuOpen(false); }}>PPE</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button onClick={() => { onCartOpen(); setMobileMenuOpen(false); }}>
            Quote Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      )}
    </header>
  );
}
