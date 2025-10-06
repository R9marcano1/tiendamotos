"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      let { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setOrders(data);
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>No tienes órdenes registradas.</p>;
  }

  return (
    <div>
      <h1>Mis Órdenes</h1>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Orden #{o.id.slice(0, 8)} - Total: {o.total} COP -{" "}
            {new Date(o.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
