/* ============================================================
   ProductModal Component
   Full-screen popup showing product detail.
   Clicking the backdrop or X button closes the modal.
   Allows selecting colour + size variants before enquiring/adding to cart.
   ============================================================ */
import { useState, useEffect } from 'react';
import { COLOUR_OPTIONS, SIZE_OPTIONS } from '../../data/products';
import { buildProductEnquiryUrl } from '../../utils/whatsapp';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedColour, setSelectedColour] = useState(product.colours[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAddToCart = () => {
    onAddToCart(
      product,
      selectedColour ? COLOUR_OPTIONS[selectedColour]?.label : null,
      selectedSize,
      quantity
    );
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const waUrl = buildProductEnquiryUrl(
    product,
    selectedColour ? COLOUR_OPTIONS[selectedColour]?.label : null,
    selectedSize
  );

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={product.name}>
      {/* Stop click propagation so clicking the modal itself doesn't close it */}
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.inner}>
          {/* LEFT: Lifestyle image */}
          <div className={styles.imageCol}>
            <div className={styles.lifestyleWrap}>
              <img
                src={product.lifestyleImage}
                alt={`${product.name} being worn`}
                className={styles.lifestyleImg}
                onError={e => { e.target.src = '/images/placeholder-lifestyle.jpg'; }}
              />
            </div>
            {/* Thumbnail below */}
            <div className={styles.thumbWrap}>
              <img
                src={product.thumbImage}
                alt={product.name}
                className={styles.thumbImg}
                onError={e => { e.target.src = '/images/placeholder-thumb.jpg'; }}
              />
            </div>
          </div>

          {/* RIGHT: Product details */}
          <div className={styles.detailCol}>
            {/* Breadcrumb */}
            <p className={styles.breadcrumb}>
              {product.category === 'security' ? 'Security' : 'PPE'} &rsaquo; {product.subcategory}
            </p>

            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.productId}>SKU: {product.id}</p>

            <p className={styles.description}>{product.description}</p>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <ul className={styles.features}>
                {product.features.map(f => (
                  <li key={f}><span className={styles.featureDot}>✔</span> {f}</li>
                ))}
              </ul>
            )}

            {/* Special note (e.g. hi-vis colour note) */}
            {product.note && <p className={styles.note}>{product.note}</p>}

            {/* Colour selector */}
            {product.colours.length > 0 && (
              <div className={styles.variantGroup}>
                <p className={styles.variantLabel}>
                  Colour: <strong>{selectedColour ? COLOUR_OPTIONS[selectedColour]?.label : 'Select'}</strong>
                </p>
                <div className={styles.swatches}>
                  {product.colours.map(colKey => (
                    <button
                      key={colKey}
                      className={`${styles.swatch} ${selectedColour === colKey ? styles.swatchActive : ''}`}
                      style={{ background: COLOUR_OPTIONS[colKey]?.hex }}
                      onClick={() => setSelectedColour(colKey)}
                      title={COLOUR_OPTIONS[colKey]?.label}
                      aria-label={`Select colour: ${COLOUR_OPTIONS[colKey]?.label}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className={styles.variantGroup}>
                <p className={styles.variantLabel}>Size: <strong>{selectedSize || 'Select'}</strong></p>
                <div className={styles.sizes}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className={styles.variantGroup}>
              <p className={styles.variantLabel}>Quantity</p>
              <div className={styles.qtyRow}>
                <button className={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span className={styles.qtyNum}>{quantity}</span>
                <button className={styles.qtyBtn} onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.actions}>
              {/* WhatsApp direct enquiry */}
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.btnWa}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enquire on WhatsApp
              </a>

              {/* Add to quote cart */}
              <button
                className={`${styles.btnCart} ${addedFeedback ? styles.btnCartAdded : ''}`}
                onClick={handleAddToCart}
              >
                {addedFeedback ? '✔ Added to Quote Cart' : 'Add to Quote Cart'}
              </button>
            </div>

            <p className={styles.priceNote}>All prices are on request. Submit a quote cart for a full quotation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
