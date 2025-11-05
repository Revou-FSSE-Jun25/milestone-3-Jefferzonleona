"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Global error detected:", error);

  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center text-gray-800">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Terjadi Kesalahan!
        </h1>
        <p className="mb-6">
          Maaf, terjadi kesalahan saat memuat halaman.
          <br />
          Silakan coba muat ulang atau kembali ke halaman utama.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
          <a
            href="/"
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Kembali ke Home
          </a>
        </div>
      </body>
    </html>
  );
}
