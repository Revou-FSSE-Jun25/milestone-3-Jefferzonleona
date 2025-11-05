// __tests__/cart.test.tsx
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "../app/context/CartContext";

function wrapper({ children }: { children?: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("CartContext", () => {
  beforeEach(() => {
    // clear localStorage to ensure clean state
    localStorage.removeItem("revo_cart");
  });

  test("addToCart should add item and increase quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, title: "Test", price: 10, image: "", quantity: 1 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);

    act(() => {
      result.current.addToCart({ id: 1, title: "Test", price: 10, image: "", quantity: 1 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  test("updateQuantity should change quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 5, title: "X", price: 30, image: "", quantity: 1 });
    });

    act(() => {
      result.current.updateQuantity(5, 3);
    });

    expect(result.current.cart[0].quantity).toBe(3);
  });

  test("removeFromCart & clearCart works", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 101, title: "A", price: 1, image: "", quantity: 1 });
      result.current.addToCart({ id: 102, title: "B", price: 2, image: "", quantity: 1 });
    });

    act(() => {
      result.current.removeFromCart(101);
    });
    expect(result.current.cart.find((c) => c.id === 101)).toBeUndefined();

    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toHaveLength(0);
  });
});
