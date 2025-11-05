"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // role mungkin undefined (guest), "user", atau "admin"
  const role = (session?.user as any)?.role;

  // Block admin: redirect to home (or show a message)
  React.useEffect(() => {
    if (role === "admin") {
      // admin tidak boleh akses cart
      router.push("/");
    }
  }, [role, router]);

  // Compute totals
  const subtotal = cart.reduce((s, item) => s + item.price * item.quantity, 0);
  const itemCount = cart.reduce((s, item) => s + item.quantity, 0);

  // Handlers
  const handleIncrement = (item: CartItem) => {
    try {
      addToCart(item); // CartContext logic increases quantity if exists
    } catch (e) {
      console.error(e);
      alert("Gagal menambah item. Coba lagi.");
    }
  };

  const handleDecrement = (item: CartItem) => {
    try {
      if (item.quantity <= 1) {
        // kalau quantity 1, hapus item
        if (confirm(`Hapus "${item.title}" dari keranjang?`)) {
          removeFromCart(item.id);
        }
        return;
      }

      removeFromCart(item.id);
      // add back with quantity -1 times
      for (let i = 0; i < item.quantity - 1; i++) {
        addToCart({ id: item.id, title: item.title, price: item.price, quantity: 1, image: item.image });
      }
    } catch (e) {
      console.error(e);
      alert("Gagal mengurangi quantity. Coba lagi.");
    }
  };

  const handleRemove = (id: number) => {
    if (!confirm("Anda yakin ingin menghapus produk ini dari keranjang?")) return;
    try {
      removeFromCart(id);
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus item. Coba lagi.");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong. Tambahkan produk sebelum checkout.");
      return;
    }
    // Direct to checkout page
    router.push("/checkout");
  };

  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="mb-4">Keranjang masih kosong.</p>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded">
            Kembali Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* items */}
          <div className="md:col-span-2 bg-white p-4 rounded shadow">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-500">Rp {item.price}</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-2 py-1 border rounded"
                      aria-label={`Kurangi ${item.title}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-2 py-1 border rounded"
                      aria-label={`Tambah ${item.title}`}
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:underline ml-4"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  if (!confirm("Kosongkan seluruh keranjang?")) return;
                  try {
                    clearCart();
                  } catch {
                    alert("Gagal mengosongkan keranjang.");
                  }
                }}
                className="text-sm text-red-600"
              >
                Kosongkan Keranjang
              </button>

              <div className="text-right">
                <div className="text-sm text-gray-500">Jumlah item: {itemCount}</div>
                <div className="text-lg font-semibold">Subtotal: Rp {subtotal}</div>
              </div>
            </div>
          </div>

          {/* summary & checkout */}
          <aside className="bg-white p-4 rounded shadow">
            <div className="mb-4">
              <div className="text-sm text-gray-500">Ringkasan Pesanan</div>
              <div className="text-2xl font-bold">Rp {subtotal}</div>
              <div className="text-sm text-gray-500">({itemCount} barang)</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Checkout
              </button>

              <Link href="/" className="w-full inline-block text-center mt-2 border px-4 py-2 rounded">
                Lanjut Belanja
              </Link>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {session ? (
                <div>Checkout sebagai: {session.user?.name}</div>
              ) : (
                <div>Anda checkout sebagai tamu. Login untuk menyimpan riwayat pesanan.</div>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
