type Product = {
  id: number
  title: string
  description: string
  price: number
  image: string
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store", // SSR
  })
  if (!res.ok) throw new Error("Gagal memuat data produk")
  return res.json()
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  return (
    <section className="max-w-3xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain mx-auto md:mx-0"
        />
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-blue-700 mb-4">
            ${product.price}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Tambah ke Keranjang
          </button>
          <div className="mt-6">
            <a href="/" className="text-blue-600 hover:underline">
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
