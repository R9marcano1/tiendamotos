export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "#f9fafb",
      color: "#111827"
    }}>
      <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Página no encontrada</p>
      <a href="/" style={{
        marginTop: "1rem",
        color: "#2563eb",
        textDecoration: "underline"
      }}>
        Volver al inicio
      </a>
    </div>
  );
}
