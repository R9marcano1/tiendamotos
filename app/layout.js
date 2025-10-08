import "./globals.css";
import { StoreProvider } from "./context/StoreProvider";

export const metadata = {
  title: "Tienda Motos",
  description: "Repuestos y accesorios para motos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
