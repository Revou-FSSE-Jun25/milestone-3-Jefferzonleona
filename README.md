# 🛍️ RevoShop — Fullstack E-commerce Project

**RevoShop** adalah platform e-commerce sederhana berbasis **Next.js**
Aplikasi ini mendemonstrasikan kemampuan membangun aplikasi web modern dengan **autentikasi**, **state management**, **API CRUD**, **role-based access control**, dan **unit testing**.

---

## 🚀 Fitur Utama

### 🔐 Authentication & Authorization

- Login menggunakan **NextAuth (Credentials Provider)**.
- Role-based access:
  - 👤 **User:** dapat melihat produk, menambah ke keranjang, dan checkout.
  - 🛠️ **Admin:** dapat mengakses dashboard admin, menambah/menghapus/mengedit produk.
- Middleware untuk membatasi akses halaman tertentu (contoh: `/admin` hanya untuk admin).

### 🛒 Shopping Cart (Global State)

- Menggunakan **React Context API** untuk menyimpan keranjang belanja.
- Data keranjang disimpan secara **persistent** di `localStorage`.
- User dapat:
  - Menambah produk ke keranjang.
  - Mengubah jumlah (quantity) produk.
  - Menghapus produk dari keranjang.
  - Melakukan checkout.

### 🧾 Admin Dashboard

- Halaman `/admin` hanya bisa diakses oleh role **admin**.
- CRUD Produk:
  - **GET** — Menampilkan semua produk.
  - **POST** — Menambah produk baru.
  - **PUT** — Mengedit produk.
  - **DELETE** — Menghapus produk.
- Validasi input menggunakan **Zod** & **React Hook Form**.

### ⚡ Performance & ISR

- Menggunakan **Incremental Static Regeneration (ISR)** dengan `revalidate` pada halaman produk.
- Komponen `useEffect` client-side untuk data fetching dinamis.

### 🧪 Unit Testing

- Menggunakan **Jest** dan **React Testing Library** untuk menguji:
  - Autentikasi dan proteksi halaman.
  - CRUD API routes.
  - Context (Cart Management).
- Target coverage ≥ **50%**.

### 💬 FAQ Page

- Halaman statis `/faq` menggunakan **SSG (Static Site Generation)**.
- Dapat diupdate secara berkala menggunakan `revalidate`.

---

## 🗂️ Struktur Folder

```
REVO-SHOP/
├── __mocks__/                        # Mock data untuk testing (Jest)
│
├── .next/                            # Folder build otomatis Next.js
├── node_modules/                     # Dependencies project
├── coverage/                         # Laporan coverage hasil unit testing
├── public/                           # File publik (favicon, assets)
│
├── src/
│   ├── __test__/                     # Unit Test Files (Jest & RTL)
│   │   ├── cart.test.tsx             # Unit test fitur keranjang
│   │   ├── navbar.test.tsx           # Unit test komponen Navbar
│   │   └── products.crud.test.ts     # Unit test API CRUD produk
│   │
│   ├── app/                          # Next.js App Router folder utama
│   │   ├── admin/
│   │   │   └── page.tsx              # Halaman Dashboard Admin (CRUD Produk)
│   │   │
│   │   ├── api/                      # API Routes (serverless)
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/route.ts   # Konfigurasi NextAuth.js (login)
│   │   │   └── products/route.ts     # API handler CRUD Produk (GET/POST/PUT/DELETE)
│   │   │
│   │   ├── auth/login
│   │   │   └── page.tsx        # Halaman Login (NextAuth credentials)
│   │   │
│   │   ├── cart/page.tsx             # Halaman Cart / Keranjang Belanja
│   │   ├── checkout/page.tsx         # Halaman Checkout (Form Pembayaran)
│   │   ├── faq/page.tsx              # Halaman FAQ / Promo (SSG)
│   │   │
│   │   ├── products/
│   │   │   ├── [id]/page.tsx         # Halaman detail produk (Dynamic Route)
│   │   │   └── [id]/ProductDetail.tsx# Komponen detail produk client-side
│   │   │
│   │   ├── layout.tsx                # Layout utama (Navbar, Provider)
│   │   ├── loading.tsx               # Global loading UI
│   │   ├── error.tsx                 # Global error UI
│   │   ├── middleware.ts             # Middleware untuk proteksi route (auth guard)
│   │   ├── providers.tsx             # NextAuth + Context Provider Wrapper
│   │   └── page.tsx                  # Halaman utama (Home page)
│   │
│   ├── components/
│   │   └── Navbar.tsx                # Komponen Navigasi (Login, Cart, Admin, Logout)
│   │
│   ├── context/
│   │   └── CartContext.tsx           # Context untuk global state keranjang belanja
│   │
│   ├── lib/
│   │   └── products.ts               # Helper/API client fetch produk
│   │
│   ├── types/
│   │   └── next-auth.d.ts            # TypeScript type declaration untuk session.user
│   │
│   ├── globals.css                   # Global styling Tailwind CSS
│
├── .env.local                        # Environment variables (NextAuth secret, dsb)
├── .gitignore                        # Ignore file list untuk Git
│
├── jest.config.cjs                   # Konfigurasi Jest
├── jest.setup.ts                     # Setup untuk Jest (RTL dan jest-dom)
│
├── next.config.ts                    # Konfigurasi Next.js (output, basePath, dll)
├── tailwind.config.js                # Konfigurasi Tailwind CSS
├── tsconfig.json                     # Konfigurasi TypeScript
├── package.json                      # Dependencies dan scripts npm
├── package-lock.json                 # Lock file dependencies
│
└── README.md                         # Dokumentasi project utama

```

---

## 🧠 Teknologi yang Digunakan

| Kategori               | Teknologi                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **Frontend Framework** | [Next.js 14+ (App Router)](https://nextjs.org/)                                    |
| **Bahasa Pemrograman** | TypeScript, JavaScript, HTML, CSS                                                  |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                           |
| **State Management**   | React Context API                                                                  |
| **Validation**         | [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)          |
| **Authentication**     | [NextAuth.js](https://next-auth.js.org/)                                           |
| **Testing**            | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| **Deployment**         | [GitHub Pages](https://pages.github.com/)                                          |

---

## 🔑 User Credentials

| Role     | Username | Password |
| -------- | -------- | -------- |
| 🧑‍💻 Admin | `admin`  | `12345`  |
| 👤 User  | `user`   | `12345`  |

---

## 🌍 Live Demo

🔗 **Live URL:**  
(https://jefferzonleona.github.io/milestone-3-revoshop/)

---

### Run Project

npm run dev

### Testing

npm run test
