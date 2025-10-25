import { NextResponse } from "next/server"

let products = [
  { id: 1, title: "Kaos Revo", price: 25, category: "Fashion" },
  { id: 2, title: "Topi Coding", price: 15, category: "Aksesoris" },
]

// GET - ambil semua produk
export async function GET() {
  return NextResponse.json(products)
}

// POST - tambah produk
export async function POST(req: Request) {
  const newProduct = await req.json()
  newProduct.id = Date.now()
  products.push(newProduct)
  return NextResponse.json(newProduct)
}

// PUT - update produk
export async function PUT(req: Request) {
  const updated = await req.json()
  products = products.map((p) => (p.id === updated.id ? updated : p))
  return NextResponse.json(updated)
}

// DELETE - hapus produk
export async function DELETE(req: Request) {
  const { id } = await req.json()
  products = products.filter((p) => p.id !== id)
  return NextResponse.json({ message: "Produk dihapus" })
}
