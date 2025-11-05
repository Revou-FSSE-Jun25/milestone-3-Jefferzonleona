"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("revo_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("revo_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qtyToAdd } : p
        );
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const getItemCount = () => cart.reduce((s, it) => s + it.quantity, 0);

  const getSubtotal = () => cart.reduce((s, it) => s + it.quantity * it.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getItemCount, getSubtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
