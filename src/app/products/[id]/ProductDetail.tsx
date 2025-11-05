"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; // pastikan path sesuai posisi filemu
import { useSession } from "next-auth/react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string; // <- tipe, bukan product.image
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = (session?.user as any)?.role;

  const handleAdd = async () => {
    setError(null);

    // Optional: block admin from adding to cart
    if (role === "admin") {
      setError("Admin tidak dapat menambahkan produk ke keranjang.");
      return;
    }

    try {
      setLoading(true);

      // Validation
      if (!product || !product.id) throw new Error("Produk tidak valid");

      // addToCart should accept image as well (see CartContext)
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1, // addToCart implementation handles default quantity
      });

      // user feedback
      alert("Produk berhasil ditambahkan ke keranjang.");
    } catch (err: any) {
      console.error("Add to cart error:", err);
      setError(err?.message || "Gagal menambahkan produk ke keranjang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded shadow">
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-56 h-56 object-contain"
            width={224}
            height={224}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-blue-700 mb-4">Rp {product.price}</p>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <div className="mt-6">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
