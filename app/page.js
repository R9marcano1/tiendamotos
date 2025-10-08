export default function Home() {
  return (
    <section className="text-center">
      <h2 className="text-4xl font-bold text-pink-400 mb-4 animate-pulse">
        ¡Bienvenido a Distrito Motos M&R!
      </h2>
      <p className="text-lg text-gray-300 mb-6">
        Encuentra accesorios y repuestos de lujo para tu moto. Calidad, estilo y envío inmediato.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <a
          href="/productos"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
        >
          🛒 Ver Productos
        </a>
        <a
          href="/contacto"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
        >
          📞 Contáctanos
        </a>
      </div>
    </section>
  );
}
