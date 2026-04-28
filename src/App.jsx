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
  const { cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const openProduct = (product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);

  // Single navigation handler shared by Navbar, Hero, Footer, and CategoryNav.
  // Sets both category + subcategory then smooth-scrolls to the product grid.
  const handleNavigate = (category, subcategory = 'all') => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onNavigate={handleNavigate}
      />

      {!searchQuery && activeCategory === 'all' && (
        <Hero onNavigate={handleNavigate} />
      )}

      <CategoryNav
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={(cat) => { setActiveCategory(cat); setActiveSubcategory('all'); }}
        onSubcategoryChange={setActiveSubcategory}
      />

      <ProductGrid
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        onProductClick={openProduct}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProduct}
          onAddToCart={addToCart}
        />
      )}

      <QuoteCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onClearCart={clearCart}
      />

      <WhatsAppFAB />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
