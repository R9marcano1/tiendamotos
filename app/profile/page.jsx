"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient"; // ✅ Import correcto

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Verificar sesión
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error al obtener usuario:", error.message);
        router.push("/login");
        return;
      }

      if (!user) {
        router.push("/login"); // Si no está logueado, redirige al login
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  // ✅ Cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Perfil de usuario</h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          {user.user_metadata?.full_name && (
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              {user.user_metadata.full_name}
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
