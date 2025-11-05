export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent rounded-full mb-6" />
      <p className="text-lg font-medium">Sedang memuat halaman...</p>
    </div>
  );
}
