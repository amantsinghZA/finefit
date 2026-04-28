import { ShoppingBag } from 'lucide-react';
import ColourSwatch from '../ui/ColourSwatch';
import './ProductCard.css';

export default function ProductCard({ product, onOpen }) {
  const firstColour = product.colours[0];

  return (
    <article className="product-card" onClick={() => onOpen(product)}>
      {/* Image */}
      <div className="pc-img-wrap">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="pc-img"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className="pc-img-placeholder" style={{ display: product.image ? 'none' : 'flex' }}>
          <span className="pc-placeholder-text">FF</span>
        </div>

        {product.badge && (
          <span className="pc-badge badge badge-gold">{product.badge}</span>
        )}

        <div className="pc-hover-cta">
          <span>View Details</span>
        </div>
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-category">{product.subcategory.replace(/-/g, ' ')}</div>
        <h3 className="pc-name">{product.name}</h3>
        <p className="pc-desc">{product.description.substring(0, 80)}…</p>

        <div className="pc-footer">
          <ColourSwatch
            colours={product.colours}
            selected={firstColour}
            onSelect={() => {}}
            size="sm"
          />
          <button
            className="pc-cart-btn"
            onClick={e => { e.stopPropagation(); onOpen(product); }}
            aria-label="View product"
          >
            <ShoppingBag size={14} />
          </button>
        </div>

        {product.hasSizes && (
          <div className="pc-sizes">S · M · L · XL · 2XL · 3XL</div>
        )}
      </div>
    </article>
  );
}
