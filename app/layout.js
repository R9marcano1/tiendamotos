import "./globals.css";
import { StoreProvider } from "./context/StoreProvider";

export const metadata = {
  title: "Distrito Motos M&R",
  description: "Accesorios y repuestos de lujo para motos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white min-h-screen">
        <StoreProvider>
          <header className="bg-black text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6">
              <h1 className="text-2xl font-bold text-pink-400">
                🏍️ Distrito Motos M&R
              </h1>
              <nav className="flex gap-6">
                <a href="/" className="hover:text-pink-400">Inicio</a>
                <a href="/productos" className="hover:text-pink-400">Productos</a>
                <a href="/carrito" className="hover:text-pink-400">Carrito</a>
                <a href="/contacto" className="hover:text-pink-400">Contacto</a>
                <a href="/login" className="hover:text-pink-400">Login</a>
              </nav>
            </div>
          </header>
          <main className="container mx-auto py-10 px-6">{children}</main>
          <footer className="bg-black py-6 mt-12 text-center text-gray-400">
            © 2025 Distrito Motos M&R — Todos los derechos reservados.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
