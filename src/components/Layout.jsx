import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (                  /*bg-blue-600*/
    <div className="min-h-dvh bg-blue-600 text-slate-100 flex flex-col">
      <Navbar />

      {/* Contenido principal que empuja el footer */}
      <main className="flex-1 mx-auto w-full max-w-[2200px] px-4 sm:px-6 lg:px-8 2xl:px-10 py-8">
        {children}
      </main>

      {/* Footer siempre abajo */}
      <footer className="border-t border-amber-200/10 py-6 text-center text-xs text-slate-300/70">
        Kakure Anime • Proyecto de equipo
      </footer>
    </div>
  );
}
