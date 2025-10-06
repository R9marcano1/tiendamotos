"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient"; // ✅ Import correcto

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Cuenta creada correctamente. Revisa tu correo para confirmar tu cuenta."
      );
      // Opcional: redirigir después de unos segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Registrarme
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
