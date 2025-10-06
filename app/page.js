import PromoCarousel from "../components/PromoCarousel";

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-red-500">🏍️ Distrito Motos M&R</h1>
        <p className="text-gray-300 mt-2">Accesorios y repuestos de lujo para motos — descubre lo mejor.</p>
      </section>
      <PromoCarousel />
    </div>
  );
}
