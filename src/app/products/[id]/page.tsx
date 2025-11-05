// src/app/products/[id]/page.tsx
import Link from "next/link";
import ProductDetailClient from "./ProductDetail"; // client component untuk Add to Cart

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

async function getProduct(id: string): Promise<Product> {
  // validasi id sederhana
  if (!id) throw new Error("ID produk tidak diberikan");

  const url = `https://fakestoreapi.com/products/${id}`;

  const res = await fetch(url, {
    cache: "no-store", // SSR, selalu fresh
  });

  // jika response bukan ok, baca text dulu untuk debugging
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} — ${text}`);
  }

  // cek content-type sebelum parse JSON
  const contentType = res.headers.get("content-type") || "";
  const bodyText = await res.text();

  if (!bodyText) {
    throw new Error("Response kosong dari API");
  }

  if (!contentType.includes("application/json")) {
    // kadang API return HTML (error page) -> tampilkan preview agar mudah debugging
    throw new Error("Response bukan JSON: " + bodyText.slice(0, 500));
  }

  try {
    return JSON.parse(bodyText);
  } catch (e) {
    // fallback handling & debugging
    throw new Error("Gagal parse JSON: " + (e as Error).message + " — response: " + bodyText.slice(0, 500));
  }
}

export default async function ProductPage(props: { params: { id: string } }) {
  // jika Next.js memberi params sebagai Promise kita unwrap dengan await
  const params = await (props.params as any);
  const id = String(params.id);

  try {
    const product = await getProduct(id);
    return <ProductDetailClient product={product} />;
  } catch (err: any) {
    // server-side friendly error UI
    console.error("Product fetch error:", err);
    return (
      <section className="max-w-3xl mx-auto py-20">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Gagal memuat produk</h2>
          <p className="text-gray-600 mb-4">Terjadi kesalahan saat memuat data. Coba lagi nanti.</p>
          <pre className="text-xs text-left bg-gray-100 p-3 rounded overflow-auto max-h-48">
            {String(err.message)}
          </pre>
          <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    );
  }
}
