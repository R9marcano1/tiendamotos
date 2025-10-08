export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-400 animate-pulse">
        🚀 Tailwind Funciona Correctamente
      </h1>
      <p className="text-lg text-gray-300">
        Si ves este fondo oscuro y el texto animado, Tailwind está activo.
      </p>
      <a
        href="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Volver al inicio
      </a>
    </div>
  );
}
