"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    category: "",
  });

  // 🔹 Pedidos
  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
  };

  const updateOrderStatus = async (id, newStatus) => {
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    fetchOrders();
  };

  // 🔹 Productos
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Nombre y precio son obligatorios");
      return;
    }
    await supabase.from("products").insert([newProduct]);
    setNewProduct({ name: "", price: "", image_url: "", category: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className="p-6 space-y-12">
      {/* 📦 PEDIDOS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Gestión de Pedidos</h1>
        <table className="w-full border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No hay pedidos registrados
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.user_id}</td>
                  <td className="p-2 border">{order.total} COP</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => updateOrderStatus(order.id, "paid")}
                      className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Confirmar Pago
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "shipped")}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Marcar Enviado
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* 🛒 PRODUCTOS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

        {/* Formulario para añadir producto */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded w-1/4"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-2 rounded w-1/4"
          />
          <input
            type="text"
            placeholder="Imagen URL"
            value={newProduct.image_url}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image_url: e.target.value })
            }
            className="border p-2 rounded w-1/4"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-2 rounded w-1/4"
          />
          <button
            onClick={addProduct}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Añadir
          </button>
        </div>

        {/* Lista de productos */}
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="p-2 border">{product.id}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.price} COP</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
