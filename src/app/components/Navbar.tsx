"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();

  // Ambil role dari session.user (bisa undefined jika belum login)
  const role = (session?.user as any)?.role;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Kiri - Navigasi utama */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          RevoShop
        </Link>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/faq" className="hover:text-gray-300">
          FAQ
        </Link>
      </div>

      {/* Kanan - Cart & Auth */}
      <div className="flex items-center space-x-4">
        {/* ✅ Cart hanya muncul untuk non-admin */}
        {role !== "admin" && (
          <Link href="/checkout" className="hover:text-gray-300">
            Cart ({cart.length})
          </Link>
        )}

        {session ? (
          <>
            {/* Nama User */}
            <span className="text-sm mr-2">
              Hi, {session.user?.name || "User"}
            </span>

            {/* Hanya tampil kalau role === "admin" */}
            {role === "admin" && (
              <Link
                href="/admin"
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
              >
                Manage Item
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="ml-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          // Jika belum login
          <Link
            href="/auth/login"
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
