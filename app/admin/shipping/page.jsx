"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ShippingAdminPage() {
  const [zones, setZones] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Cargar zonas existentes
  useEffect(() => {
    fetchZones();
  }, []);

  async function fetchZones() {
    const { data, error } = await supabase.from("shipping_zones").select("*").order("id");
    if (error) console.error(error);
    else setZones(data);
  }

  // Agregar nueva zona
  async function addZone(e) {
    e.preventDefault();
    if (!name || !cost) return alert("Completa todos los campos");

    if (editingId) {
      // Si estamos editando
      const { error } = await supabase
        .from("shipping_zones")
        .update({ name, cost })
        .eq("id", editingId);

      if (error) {
        console.error(error);
        alert("Error al actualizar zona");
      } else {
        setName("");
        setCost("");
        setEditingId(null);
        fetchZones();
      }
    } else {
      // Si es una nueva zona
      const { error } = await supabase.from("shipping_zones").insert([{ name, cost }]);
      if (error) {
        console.error(error);
        alert("Error al agregar zona");
      } else {
        setName("");
        setCost("");
        fetchZones();
      }
    }
  }

  // Eliminar zona
  async function deleteZone(id) {
    const { error } = await supabase.from("shipping_zones").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Error al eliminar zona");
    } else {
      fetchZones();
    }
  }

  // Activar edición
  function startEdit(zone) {
    setName(zone.name);
    setCost(zone.cost);
    setEditingId(zone.id);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administrar Zonas de Envío</h1>

      <form onSubmit={addZone} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre de la localidad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="number"
          placeholder="Costo"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="border rounded px-3 py-2 w-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Actualizar" : "Agregar"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setCost("");
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Localidad</th>
            <th className="border px-4 py-2">Costo</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td className="border px-4 py-2">{zone.id}</td>
              <td className="border px-4 py-2">{zone.name}</td>
              <td className="border px-4 py-2">${zone.cost}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => startEdit(zone)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteZone(zone.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
