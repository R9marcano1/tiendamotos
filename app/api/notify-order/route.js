import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const order = await req.json();

    await resend.emails.send({
      from: "Tienda Motos <notificaciones@tiendamotos.com>",
      to: "tu_correo@gmail.com", // <-- cámbialo por tu correo
      subject: "📦 Nuevo Pedido en TiendaMotos",
      html: `
        <h2>Nuevo Pedido Recibido</h2>
        <p><strong>Cliente:</strong> ${order.user_id}</p>
        <p><strong>Total:</strong> ${order.total} COP</p>
        <p><strong>Fecha:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
