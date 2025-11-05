import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Providers from "./providers";

export const metadata = {
  title: "RevoShop",
  description: "Next.js E-commerce Project with Authentication",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
