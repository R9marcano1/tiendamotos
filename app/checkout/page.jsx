"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useStore } from "@/app/context/StoreProvider";

export default function CheckoutPage() {
  const { cart } = useStore();
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  // Subtotal de productos
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  // Cargar zonas desde Supabase (en tiempo real)
  useEffect(() => {
    fetchZones();

    const subscription = supabase
      .channel("shipping_zones-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shipping_zones" },
        () => fetchZones()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchZones() {
    const { data, error } = await supabase.from("shipping_zones").select("*").order("id");
    if (error) console.error(error);
    else setZones(data);
  }

  function handleZoneChange(e) {
    const zoneId = e.target.value;
    const zone = zones.find((z) => z.id === parseInt(zoneId));
    setSelectedZone(zone);
    setShippingCost(zone ? Number(zone.cost) : 0);
  }

  async function handleConfirmOrder() {
    if (!selectedZone) {
      alert("Selecciona una localidad para el envío 🚚");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        items: cart,
        subtotal,
        shipping_cost: shippingCost,
        total,
        shipping_zone_id: selectedZone.id,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Hubo un error al confirmar el pedido ❌");
    } else {
      alert("✅ Pedido confirmado con envío incluido");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="text-xl font-semibold mb-2">Carrito</h2>
      <ul className="mb-4">
        {cart.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Selecciona tu localidad:</label>
        <select
          className="border rounded px-3 py-2 w-full"
          onChange={handleZoneChange}
        >
          <option value="">-- Selecciona --</option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name} - ${zone.cost}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Envío:</span>
          <span>${shippingCost}</span>
        </p>
        <p className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total}</span>
        </p>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
