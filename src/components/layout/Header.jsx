import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Phone } from 'lucide-react';
import './Header.css';

const WA_NUMBER = '27746461491';

export default function Header({ cartItemCount, onCartOpen, onSearchOpen, activeCat, onCatChange }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 769) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const navLinks = [
    { id: 'security', label: 'Security' },
    { id: 'ppe',      label: 'PPE' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🇿🇦 Proudly South African</span>
        <span className="sep">|</span>
        <span>Bulk Orders Welcome</span>
        <span className="sep">|</span>
        <span>Custom Branding Available</span>
        <span className="sep">|</span>
        <span>Nationwide Delivery</span>
      </div>

      {/* Main Nav */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">

          {/* Logo */}
          <a href="/" className="logo" onClick={e => { e.preventDefault(); onCatChange(null); }}>
            <div className="logo-crest">⚜️</div>
            <div>
              <div className="logo-name">Fine Fit</div>
              <div className="logo-sub">Uniform &amp; Overall Co.</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <button
              className={`nav-link ${activeCat === null ? 'active' : ''}`}
              onClick={() => onCatChange(null)}
            >
              All Products
            </button>
            {navLinks.map(link => (
              <button
                key={link.id}
                className={`nav-link ${activeCat === link.id ? 'active' : ''}`}
                onClick={() => onCatChange(link.id)}
              >
                {link.label}
              </button>
            ))}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Fine Fit, I\'d like to enquire about your products.')}`}
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-wa"
            >
              <Phone size={13} />
              +27 74 646 1491
            </a>
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <button className="icon-btn" onClick={onSearchOpen} aria-label="Search">
              <Search size={18} />
            </button>
            <button className="icon-btn cart-btn" onClick={onCartOpen} aria-label="Open quote cart">
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
            <button
              className="icon-btn hide-desktop"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay">
          <button
            className="mob-nav-link"
            onClick={() => { onCatChange(null); setMobileOpen(false); }}
          >
            All Products
          </button>
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`mob-nav-link ${activeCat === link.id ? 'active' : ''}`}
              onClick={() => { onCatChange(link.id); setMobileOpen(false); }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Fine Fit, I\'d like to enquire about your products.')}`}
            target="_blank"
            rel="noreferrer"
            className="mob-nav-link mob-wa"
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp Us
          </a>
          <button
            className="mob-cart-btn btn btn-gold"
            onClick={() => { onCartOpen(); setMobileOpen(false); }}
          >
            <ShoppingBag size={16} />
            Quote Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
        </div>
      )}
    </>
  );
}
