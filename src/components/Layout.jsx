import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
          width: "100%",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          padding: "12px",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          fontSize: "12px",
        }}
      >
        Kakure Anime
      </footer>
    </div>
  );
}
