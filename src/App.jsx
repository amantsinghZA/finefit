/* ============================================================
   FINE FIT - Root App Component
   Manages global state: cart, active page, product modal.
   All child components receive what they need via props.
   For a larger site, consider React Context or Zustand.
   ============================================================ */
import { useState } from 'react';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CategoryNav from './components/CategoryNav/CategoryNav';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductModal from './components/ProductModal/ProductModal';
import QuoteCart from './components/QuoteCart/QuoteCart';
import Footer from './components/Footer/Footer';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';

function App() {
  // --- Quote cart state (managed by useCart hook) ---
  const { cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  // --- UI state ---
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product currently in modal
  const [activeCategory, setActiveCategory] = useState('all');  // 'all' | 'security' | 'ppe'
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Open product detail modal
  const openProduct = (product) => setSelectedProduct(product);

  // Close product detail modal
  const closeProduct = () => setSelectedProduct(null);

  return (
    <div className="app">
      {/* ── Top navigation bar ── */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* ── Hero banner (homepage only) ── */}
      {!searchQuery && activeCategory === 'all' && <Hero />}

      {/* ── Category + subcategory filter tabs ── */}
      <CategoryNav
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={(cat) => { setActiveCategory(cat); setActiveSubcategory('all'); }}
        onSubcategoryChange={setActiveSubcategory}
      />

      {/* ── Product grid ── */}
      <ProductGrid
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        onProductClick={openProduct}
      />

      {/* ── Product detail modal (popup) ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProduct}
          onAddToCart={addToCart}
        />
      )}

      {/* ── Quote cart drawer ── */}
      <QuoteCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onClearCart={clearCart}
      />

      {/* ── Floating WhatsApp button ── */}
      <WhatsAppFAB />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
