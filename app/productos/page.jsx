export default function Productos() {
  const productos = [
    { nombre: "Manilares de Lujo", precio: "$120.000" },
    { nombre: "Espejos Racing", precio: "$95.000" },
    { nombre: "Luces LED Full Color", precio: "$75.000" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-pink-400 mb-6">🛍️ Productos Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-md text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2">{p.nombre}</h3>
            <p className="text-gray-400">{p.precio}</p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 mt-3 rounded-md">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
