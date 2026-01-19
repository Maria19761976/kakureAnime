import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="rounded-2xl border border-amber-200/15 bg-slate-800/35 p-6 sm:p-10">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-amber-200/80">
            COLECCIÓN CURADA
          </p>

          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-amber-50">
            Kakure Anime
          </h1>

          <p className="mt-3 max-w-2xl text-slate-200/75">
            Descubre películas de anime seleccionadas por estilo, emoción y calidad visual.
            Explora el catálogo, guarda tus favoritas y mantén tu colección siempre al día.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/movies"
            className="rounded-xl bg-amber-200 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-100 transition"
          >
            Ver catálogo
          </Link>

          <Link
            to="/add-movie"
            className="rounded-xl border border-amber-200/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5 transition"
          >
            Añadir película
          </Link>
        </div>

        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Curado", v: "Películas seleccionadas" },
            { k: "Rápido", v: "Busca y filtra al instante" },
            { k: "Tu catálogo", v: "Edítalo cuando quieras" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-2xl border border-amber-200/10 bg-slate-900/30 p-4"
            >
              <p className="text-sm font-semibold text-amber-50">{x.k}</p>
              <p className="mt-1 text-sm text-slate-200/70">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
