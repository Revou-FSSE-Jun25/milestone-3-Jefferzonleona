"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";

const checkoutSchema = z.object({
  fullname: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(6, "Masukkan nomor telepon yang valid"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // block admin users (redirect)
  React.useEffect(() => {
    const role = (session?.user as any)?.role;
    if (role === "admin") {
      router.push("/");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullname: "", address: "", email: "", phone: "" },
  });

  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  async function onSubmit(values: CheckoutForm) {
    if (cart.length === 0) {
      alert("Keranjang kosong. Tidak dapat melakukan checkout.");
      return;
    }

    try {
      // Simulate API request to create order. Replace with real API call.
      const orderPayload = {
        customer: values,
        items: cart,
        total: subtotal,
        createdAt: new Date().toISOString(),
      };

      // Simulate network latency
      await new Promise((res) => setTimeout(res, 800));

      // If success
      clearCart();
      alert("Pesanan berhasil dibuat! Terima kasih.");
      router.push("/");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Terjadi kesalahan saat checkout. Coba lagi.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <input {...register("fullname")} className="w-full border p-2 rounded" />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Alamat</label>
            <textarea {...register("address")} className="w-full border p-2 rounded" rows={4} />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input {...register("email")} className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">No. Telepon</label>
            <input {...register("phone")} className="w-full border p-2 rounded" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {isSubmitting ? "Memproses..." : `Bayar Rp ${subtotal}`}
            </button>

            <button type="button" onClick={() => router.push("/cart")} className="ml-2 px-4 py-2 border rounded">
              Kembali ke Keranjang
            </button>
          </div>
        </form>

        {/* order summary */}
        <aside className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-3">Ringkasan Pesanan</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Keranjang kosong.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((it) => (
                <li key={it.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                  </div>
                  <div className="font-semibold">Rp {it.price * it.quantity}</div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t pt-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rp {subtotal}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">Biaya kirim dan pajak akan ditambahkan nanti.</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
