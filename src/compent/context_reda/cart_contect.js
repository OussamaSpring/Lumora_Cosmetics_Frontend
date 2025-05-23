import React, { createContext, useEffect, useState } from 'react';

export const CartContext_reda = createContext();

export default function Cart_provaider({ children }) {
  const [cartitems, setCartitems] = useState(() => {
    try {
      const saveCart = localStorage.getItem('cartitem');
      // Check if saveCart exists and is valid JSON
      if (saveCart) {
        const parsed = JSON.parse(saveCart);
        // Additional check to ensure it's an array
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return []; // Return empty array if parsing fails
    }
  });


    const addtocart = (item) => {
        setCartitems((prevItem) => [...prevItem, item]);
    }
    useEffect(() => {
      localStorage.setItem('cartitem', JSON.stringify(cartitems));
  }, [cartitems]); // Only run when cartitems changes

    return (
        <CartContext_reda.Provider value={{ cartitems, addtocart }}>
            {children}
        </CartContext_reda.Provider>
    );
}