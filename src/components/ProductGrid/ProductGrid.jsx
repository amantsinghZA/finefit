/* ============================================================
   ProductGrid Component
   Renders filtered product cards.
   Clicking a card opens the ProductModal.
   ============================================================ */
import { PRODUCTS, COLOUR_OPTIONS, searchProducts } from '../../data/products';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ activeCategory, activeSubcategory, searchQuery, onProductClick }) {
  // Filter logic
  let products = PRODUCTS;

  if (searchQuery && searchQuery.trim().length > 0) {
    products = searchProducts(searchQuery);
  } else {
    if (activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }
    if (activeSubcategory !== 'all') {
      products = products.filter(p => p.subcategory === activeSubcategory);
    }
  }

  if (products.length === 0) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.empty}>
            <p>No products found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
            <p className={styles.emptySub}>Try a different search or browse a category above.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.count}>{products.length} product{products.length !== 1 ? 's' : ''}</p>
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Product Card ───────────────────────────────────────────── */
function ProductCard({ product, onClick }) {
  return (
    <article className={styles.card} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${product.name}`}>

      {/* Product image */}
      <div className={styles.imgWrap}>
        <img
          src={product.thumbImage}
          alt={product.name}
          className={styles.img}
          onError={e => { e.target.src = '/images/placeholder-thumb.jpg'; }}
        />
        {/* Category badge */}
        <span className={`${styles.badge} ${product.category === 'security' ? styles.badgeSecurity : styles.badgePpe}`}>
          {product.category === 'security' ? 'Security' : 'PPE'}
        </span>
        {/* Hover overlay */}
        <div className={styles.hoverOverlay}>
          <span>View Details</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <p className={styles.subcat}>{product.subcategory}</p>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Colour swatches preview */}
        {product.colours.length > 0 && (
          <div className={styles.swatches}>
            {product.colours.slice(0, 5).map(colKey => (
              <span
                key={colKey}
                className={styles.swatch}
                style={{ background: COLOUR_OPTIONS[colKey]?.hex }}
                title={COLOUR_OPTIONS[colKey]?.label}
              />
            ))}
            {product.colours.length > 5 && (
              <span className={styles.swatchMore}>+{product.colours.length - 5}</span>
            )}
          </div>
        )}

        <p className={styles.price}>Price on Request</p>
      </div>
    </article>
  );
}
