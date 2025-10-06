"use client";
import Link from "next/link";
import CartWidget from "./CartWidget";

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-500">🏍️ Distrito Motos</Link>
        <nav className="flex gap-4 items-center">
          <Link href="/productos" className="hover:text-red-400">Productos</Link>
          <Link href="/admin" className="text-sm px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">Admin</Link>
          <Link href="/contacto" className="hover:text-red-400">Contacto</Link>
        </nav>
        <CartWidget />
      </div>
    </header>
  );
}
