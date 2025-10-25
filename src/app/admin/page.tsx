"use client"

import { useEffect, useState } from "react"

type Product = {
  id: number
  title: string
  price: number
  category: string
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState({ title: "", price: "", category: "" })
  const [editing, setEditing] = useState<number | null>(null)

  // Fetch data dari API lokal (simulasi)
  const fetchProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing ? "PUT" : "POST"
    const body = editing ? { id: editing, ...form } : form
    await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setForm({ title: "", price: "", category: "" })
    setEditing(null)
    fetchProducts()
  }

  const handleDelete = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchProducts()
  }

  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Form tambah/edit produk */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-md mb-10"
      >
        <h2 className="font-semibold mb-4">
          {editing ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Nama Produk"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Harga"
            type="number"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Kategori"
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Daftar produk */}
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Harga</th>
            <th className="py-2 px-4 text-left">Kategori</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 px-4">{p.title}</td>
              <td className="py-2 px-4">${p.price}</td>
              <td className="py-2 px-4">{p.category}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setForm({
                      title: p.title,
                      price: String(p.price),
                      category: p.category,
                    })
                    setEditing(p.id)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(p.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
