"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
};

const schema = z.object({
  title: z.string().min(1, "Nama item wajib diisi"),
  price: z.preprocess(
    (v) => Number(v),
    z.number().positive("Harga harus lebih dari 0")
  ),
  category: z.string().optional(),
  description: z.string().optional(),
});

export default function AdminPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "", price: 0, category: "", description: "" },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    if (!res.ok) return;
    const data = await res.json();
    setProducts(data);
  }

  async function onSubmit(values: any) {
    try {
      if (!session || (session.user as any).role !== "admin") {
        alert("Unauthorized");
        return;
      }

      const method = editing ? "PUT" : "POST";
      const payload = editing ? { id: editing.id, ...values } : values;

      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      alert(editing ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!");
      reset();
      setEditing(null);
      fetchProducts();
    } catch (e) {
      alert("Terjadi kesalahan, coba lagi.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  }

  function startEdit(p: Product) {
    setEditing(p);
    reset({
      title: p.title,
      price: p.price,
      category: p.category,
      description: p.description,
    });
  }

  if (!session) {
    return (
      <div className="py-20 text-center">
        <p>Loading session... (or you are not authenticated)</p>
      </div>
    );
  }

  if ((session.user as any).role !== "admin") {
    return (
      <div className="py-20 text-center">
        <p>Anda tidak memiliki akses ke halaman Admin.</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="font-semibold mb-4 text-lg">
          {editing ? "Edit Produk" : "Tambah Produk"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Item */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Nama Item</label>
            <input
              {...register("title")}
              placeholder="Masukkan nama produk"
              className="border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message as string}
              </p>
            )}
          </div>

          {/* Harga */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Harga</label>
            <input
              {...register("price")}
              type="number"
              placeholder="Masukkan harga"
              className="border p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message as string}
              </p>
            )}
          </div>

          {/* Kategori */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Kategori</label>
            <input
              {...register("category")}
              placeholder="Masukkan kategori"
              className="border p-2 rounded"
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Deskripsi</label>
            <input
              {...register("description")}
              placeholder="Masukkan deskripsi produk"
              className="border p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editing ? "Simpan Perubahan" : "Tambah Produk"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                reset();
              }}
              className="ml-2 px-4 py-2 border rounded hover:bg-gray-100"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel produk */}
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Nama Item</th>
            <th className="p-2 text-left">Harga</th>
            <th className="p-2 text-left">Kategori</th>
            <th className="p-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.title}</td>
              <td className="p-2">Rp {p.price}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => startEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
