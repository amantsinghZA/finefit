import { useState, useEffect } from 'react';
import { X, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import ColourSwatch from '../ui/ColourSwatch';
import WhatsAppButton from '../ui/WhatsAppButton';
import { SIZES } from '../../data/products';
import './ProductModal.css';

const WA_NUMBER = '27746461491';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedColour, setSelectedColour] = useState(product.colours[0]);
  const [selectedSize,   setSelectedSize]   = useState(product.hasSizes ? 'M' : null);
  const [qty, setQty]                       = useState(1);
  const [added, setAdded]                   = useState(false);
  const [activeImg, setActiveImg]           = useState('lifestyle'); // 'lifestyle' | 'thumb'

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const waMessage =
    `Hi Fine Fit, I'd like to enquire about the *${product.name}*` +
    (selectedColour ? ` in *${selectedColour}*` : '') +
    (selectedSize   ? ` size *${selectedSize}*` : '') +
    `. Please send me pricing and availability.`;

  const handleAddToCart = () => {
    onAddToCart(product, selectedColour, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = [product.lifestyleImage, product.image].filter(Boolean);
  const currentImage = activeImg === 'lifestyle' ? product.lifestyleImage : product.image;

  return (
    <>
      {/* Backdrop — click outside to close */}
      <div className="overlay-backdrop" onClick={onClose} />

      <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-inner">
          {/* ── LEFT: Images ── */}
          <div className="modal-images">
            {/* Main image */}
            <div className="modal-main-img">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
              ) : null}
              <div className="modal-img-placeholder">
                <span>FF</span>
              </div>

              {/* Nav arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    className="img-nav img-nav-prev"
                    onClick={() => setActiveImg(activeImg === 'lifestyle' ? 'thumb' : 'lifestyle')}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="img-nav img-nav-next"
                    onClick={() => setActiveImg(activeImg === 'lifestyle' ? 'thumb' : 'lifestyle')}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="modal-thumbs">
                {[
                  { key: 'lifestyle', src: product.lifestyleImage, label: 'Worn' },
                  { key: 'thumb',     src: product.image,          label: 'Item' },
                ].filter(t => t.src).map(t => (
                  <button
                    key={t.key}
                    className={`thumb-btn ${activeImg === t.key ? 'active' : ''}`}
                    onClick={() => setActiveImg(t.key)}
                  >
                    <img src={t.src} alt={t.label} onError={e => e.target.parentElement.style.display='none'} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="modal-details">
            {/* Category + Badge */}
            <div className="modal-meta">
              <span className="modal-category">{product.subcategory.replace(/-/g, ' ')}</span>
              {product.badge && <span className="badge badge-gold">{product.badge}</span>}
              {product.sku && <span className="modal-sku">SKU: {product.sku}</span>}
            </div>

            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-desc">{product.description}</p>

            {/* Colour */}
            <div className="modal-section">
              <div className="modal-section-label">
                Colour: <strong>{selectedColour}</strong>
              </div>
              <ColourSwatch
                colours={product.colours}
                selected={selectedColour}
                onSelect={setSelectedColour}
                size="lg"
              />
            </div>

            {/* Size */}
            {product.hasSizes && (
              <div className="modal-section">
                <div className="modal-section-label">Size</div>
                <div className="size-grid">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="modal-section">
              <div className="modal-section-label">Quantity</div>
              <div className="qty-row">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="modal-ctas">
              <button
                className={`btn btn-primary modal-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} />
                {added ? '✓ Added to Quote' : 'Add to Quote Cart'}
              </button>

              <WhatsAppButton
                message={waMessage}
                label="Enquire on WhatsApp"
                variant="inline"
              />
            </div>

            <p className="modal-note">
              Price on request — submit a quote cart or WhatsApp us for bulk pricing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
