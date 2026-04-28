/* ============================================================
   useCart Hook
   Manages the quote cart state.
   The cart is NOT ecommerce - it builds a quotation enquiry.
   Each cart item stores: product, selected colour, selected size, quantity.
   ============================================================ */

import { useState, useCallback } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart (or increment qty if same variant exists)
  const addToCart = useCallback((product, selectedColour, selectedSize, qty = 1) => {
    setCartItems(prev => {
      // Build a unique key from product + variant
      const variantKey = `${product.id}-${selectedColour}-${selectedSize}`;
      const existing = prev.find(item => item.variantKey === variantKey);

      if (existing) {
        // Increment quantity
        return prev.map(item =>
          item.variantKey === variantKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      // Add new item
      return [...prev, {
        variantKey,
        product,
        selectedColour,
        selectedSize,
        quantity: qty,
      }];
    });
  }, []);

  // Remove a specific variant from cart
  const removeFromCart = useCallback((variantKey) => {
    setCartItems(prev => prev.filter(item => item.variantKey !== variantKey));
  }, []);

  // Update quantity for an item
  const updateQuantity = useCallback((variantKey, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.variantKey === variantKey ? { ...item, quantity } : item
      )
    );
  }, []);

  // Clear the entire cart (call after successful enquiry submission)
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total number of items (sum of quantities)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
