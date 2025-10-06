export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Distrito Motos. Todos los derechos reservados.
      </div>
    </footer>
  );
}
