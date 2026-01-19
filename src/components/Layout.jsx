import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <footer>
        Kakure Anime
      </footer>
    </div>
  );
}
