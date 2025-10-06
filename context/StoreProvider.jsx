"use client";
import { createContext, useContext, useState } from "react";

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}
