export default function Contacto() {
  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-pink-400 mb-4 text-center">📞 Contáctanos</h2>
      <p className="text-gray-300 mb-6 text-center">
        Escríbenos para asesoría o pedidos especiales.
      </p>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Tu nombre"
          className="bg-gray-800 p-3 rounded-md outline-none"
        />
        <input
          type="email"
          placeholder="Tu correo"
          className="bg-gray-800 p-3 rounded-md outline-none"
        />
        <textarea
          placeholder="Tu mensaje"
          rows="4"
          className="bg-gray-800 p-3 rounded-md outline-none"
        ></textarea>
        <button className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-md">
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
