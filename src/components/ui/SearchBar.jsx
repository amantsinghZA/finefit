import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchProducts } from '../../data/products';
import './SearchBar.css';

export default function SearchBar({ onClose, onProductSelect }) {
  const [query, setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setResults(searchProducts(query).slice(0, 8));
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="search-panel" role="dialog" aria-label="Search products">
        <div className="search-input-row">
          <Search size={18} className="search-icon" />
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search products, categories, colours…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="search-close" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map(product => (
              <li key={product.id}>
                <button
                  className="search-result-item"
                  onClick={() => { onProductSelect(product); onClose(); }}
                >
                  <div className="sr-thumb">
                    {product.image ? (
                      <img src={product.image} alt={product.name} onError={e => e.target.style.display='none'} />
                    ) : (
                      <div className="sr-thumb-placeholder">FF</div>
                    )}
                  </div>
                  <div className="sr-info">
                    <div className="sr-name">{product.name}</div>
                    <div className="sr-cat">{product.category.toUpperCase()} · {product.subcategory}</div>
                  </div>
                  <span className="badge badge-maroon">{product.badge || product.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="search-empty">
            No products found for "<strong>{query}</strong>"
          </div>
        )}

        {query.length < 2 && (
          <div className="search-hint">
            Type at least 2 characters to search…
          </div>
        )}
      </div>
    </>
  );
}
