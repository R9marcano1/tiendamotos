"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Intentar leer productos (debe funcionar sin login)
        const { data: prodData, error: prodError } = await supabase
          .from("products")
          .select("*");

        if (prodError) throw prodError;
        setProducts(prodData);

        // 2. Intentar leer órdenes (sin login → debe fallar o devolver vacío)
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*");

        if (orderError) {
          setError(orderError.message);
        } else {
          setOrders(orderData);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>🔎 Test de Policies</h1>

      <h2>📦 Productos (público)</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>

      <h2>🛒 Órdenes (solo usuario logueado)</h2>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      )}
    </div>
  );
}
