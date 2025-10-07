import "./globals.css";
import { CartProvider } from "./context/CartContext.jsx";

export const metadata = {
  title: "Distrito Motos",
  description: "Tienda de repuestos y accesorios para motos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
