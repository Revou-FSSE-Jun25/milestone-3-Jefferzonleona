import Link from "next/link"

type Product = {
  id: number
  title: string
  price: number
  image: string
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 }, // Static + ISR
  })
  if (!res.ok) throw new Error("Gagal memuat data produk")
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 RevoShop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain"
            />
            <h2 className="mt-3 font-medium line-clamp-1">{product.title}</h2>
            <p className="text-blue-600 font-semibold">${product.price}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
