/* ============================================================
   CategoryNav Component
   Tab bar for switching between Security / PPE categories
   and their subcategories.
   ============================================================ */
import { CATEGORIES } from '../../data/products';
import styles from './CategoryNav.module.css';

export default function CategoryNav({ activeCategory, activeSubcategory, onCategoryChange, onSubcategoryChange }) {
  const currentCat = CATEGORIES[activeCategory];

  return (
    <div className={styles.wrap} id="products">
      {/* Main category tabs */}
      <div className={styles.mainTabs}>
        <div className="container">
          <div className={styles.tabRow}>
            <button
              className={`${styles.tab} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => onCategoryChange('all')}
            >
              All Products
            </button>
            {Object.values(CATEGORIES).map(cat => (
              <button
                key={cat.id}
                id={cat.id}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory tabs - only show when a main category is selected */}
      {currentCat && (
        <div className={styles.subTabs}>
          <div className="container">
            <div className={styles.subTabRow}>
              <button
                className={`${styles.subTab} ${activeSubcategory === 'all' ? styles.subActive : ''}`}
                onClick={() => onSubcategoryChange('all')}
              >
                All {currentCat.label}
              </button>
              {Object.entries(currentCat.subcategories).map(([key, label]) => (
                <button
                  key={key}
                  className={`${styles.subTab} ${activeSubcategory === key ? styles.subActive : ''}`}
                  onClick={() => onSubcategoryChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
