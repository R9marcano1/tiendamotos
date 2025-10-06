"use client";
export default function ProductCard({ producto, onAdd }) {
  return (
    <div className="bg-gray-800 rounded shadow p-4 flex flex-col">
      <img src={producto.imagen_url || "/placeholder.png"} alt={producto.nombre} className="w-full h-44 object-cover rounded mb-3" />
      <h3 className="font-semibold text-lg">{producto.nombre}</h3>
      <p className="text-sm text-gray-300 mt-1 line-clamp-2">{producto.descripcion}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="text-green-400 font-bold">${Number(producto.precio).toLocaleString()}</div>
        <button onClick={() => onAdd(producto)} className="px-3 py-2 bg-red-500 rounded hover:bg-red-600">
          🛒 Añadir
        </button>
      </div>
    </div>
  );
}
