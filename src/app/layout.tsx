import "./globals.css"
import Link from "next/link"
import { ReactNode } from "react"
import { CartProvider } from "./context/CartContext"

export const metadata = {
  title: "RevoShop",
  description: "Tugas Module 4 - Next.js E-commerce",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            RevoShop
          </Link>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-6">{children}</main>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
