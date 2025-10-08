export async function GET() {
  return Response.json([
    { id: 1, nombre: "Pedido de prueba" },
    { id: 2, nombre: "Otro pedido" }
  ]);
}
