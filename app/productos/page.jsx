"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener productos
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  // 🔹 Agregar al carrito
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // 🔹 Eliminar del carrito
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // 🔹 Guardar pedido en Supabase
  const checkout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setLoading(true);

    const total = cart.reduce((sum, item) => sum + Number(item.precio), 0);

    const { data, error } = await supabase.from("orders").insert([
      {
        productos: cart.map((item) => item.nombre).join(", "),
        total,
        estado: "pendiente", // puedes cambiarlo luego a "pagado"
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("❌ Error al guardar el pedido");
    } else {
      alert("✅ Pedido registrado con éxito");
      setCart([]); // Vaciar carrito
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      {/* 🛍️ Productos */}
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">Productos Disponibles</h1>
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg"
              >
                {product.imagen_url && (
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h2 className="text-lg font-semibold mt-2">{product.nombre}</h2>
                <p className="text-gray-500">{product.descripcion}</p>
                <p className="text-green-600 font-bold mt-2">
                  {product.precio} COP
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full"
                >
                  Añadir al Carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🛒 Carrito */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Carrito</h1>
        {cart.length === 0 ? (
          <p>No has agregado productos</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-500">{item.precio} COP</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 font-bold"
                >
                  X
                </button>
              </div>
            ))}
            <p className="font-bold">
              Total:{" "}
              {cart.reduce((sum, item) => sum + Number(item.precio), 0)} COP
            </p>
            <button
              onClick={checkout}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Procesando..." : "Finalizar Pedido"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
