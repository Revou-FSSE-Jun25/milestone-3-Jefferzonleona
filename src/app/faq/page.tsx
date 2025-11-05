import React from "react"

export const revalidate = 3600 // Revalidate every 1 hour (ISR)
// Atau pakai force-static agar 100% statis tanpa revalidate
// export const dynamic = "force-static"

type FAQItem = {
  question: string
  answer: string
}

// Data statis (bisa juga fetch dari CMS JSON lokal)
const faqs: FAQItem[] = [
  {
    question: "Apa itu RevoShop?",
    answer:
      "RevoShop adalah platform e-commerce sederhana yang dibuat untuk pembelajaran Next.js.",
  },
  {
    question: "Bagaimana cara berbelanja?",
    answer:
      "Kamu cukup login, pilih produk yang kamu suka, masukkan ke keranjang, dan lakukan checkout.",
  },
  {
    question: "Apakah perlu akun untuk checkout?",
    answer:
      "Tidak wajib. Kamu bisa checkout sebagai tamu, tapi riwayat belanja tidak akan tersimpan.",
  },
  {
    question: "Apakah produk yang ditampilkan nyata?",
    answer: "Tidak, ini hanya proyek demo pembelajaran.",
  },
]

export default async function FAQPage() {
  // simulasi fetch async agar kamu bisa ganti dengan fetch API statis
  const data = await new Promise<FAQItem[]>((resolve) =>
    setTimeout(() => resolve(faqs), 100)
  )

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">❓ Frequently Asked Questions</h1>

      <section className="space-y-6">
        {data.map((faq, i) => (
          <article
            key={i}
            className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-2 text-blue-700">{faq.question}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </article>
        ))}
      </section>

      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">
          Halaman ini di-*generate secara statis* menggunakan Next.js SSG.
        </p>
      </div>
    </main>
  )
}
