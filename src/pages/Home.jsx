import { Link } from "react-router-dom";
import Carrousel from "../components/Carrousel";

export default function Home() {
  return (
    <section className="space-y-10">
      {}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/15 bg-blue-400 p-6 sm:p-10">
        {}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

        {}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            {}
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-slate-900/20 px-3 py-1 text-xs text-slate-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
              Videoclub de anime • Catálogo curado
            </p>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-lime-400">
              Kakure Anime
            </h1>

            <p className="max-w-prose text-slate-200/80">
              Descubre películas de anime recomendadas, filtra por género o año
              y guarda tus favoritas para volver a ellas cuando quieras.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/movies"
                className="inline-flex items-center justify-center rounded-xl border-2 border-lime-400 px-5 py-2.5 text-sm font-semibold text-amber-50 hover:bg-lime-300/40"
              >
                Explorar catálogo
              </Link>

              <Link
                to="/add-movie"
                className="inline-flex items-center justify-center rounded-xl bg-lime-300 px-5 py-2.5 text-sm font-semibold text-black hover:bg-lime-400"
              >
                Añadir recomendación
              </Link>
            </div>

            {}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
              <Stat label="Colección" value="Películas" />
              <Stat label="Filtros" value="Género y año" />
              <Stat label="Búsqueda" value="Rápida" />
              <Stat label="Experiencia" value="Premium" />
            </div>

            {}
          </div>

          {}
          <div className="relative">
            <div className="rounded-3xl border border-amber-200/15 bg-lime-300/90 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-black">Sugerencia de hoy</p>
                  <h3 className="mt- text-lg font-semibold text-black">
                    Encuentra tu próxima película
                  </h3>
                </div>
                <span className="rounded-full border border-amber-200/15 bg-amber-200/10 px-2.5 py-1 text-xs font-semibold text-amber-50">
                  Tips
                </span>
              </div>

              <p className="mt-3 text-sm text-black">
                Usa los filtros para descubrir joyas de Studio Ghibli, clásicos
                imprescindibles o películas modernas.
              </p>

              <div className="mt-5 grid gap-3">
                <Hint text="Busca por título o por estudio." />
                <Hint text="Filtra por género y por año." />
                <Hint text="Guarda tus preferencias para la próxima visita." />
              </div>

              <div className="mt-6">
                <Link
                  to="/movies"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-amber-200/20 bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-lime-200"
                >
                  Ir al catálogo
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-8 -bottom-3 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />
          </div>
        </div>
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-3">
        <Feature
          title="Catálogo de películas"
          desc="Una selección de títulos para explorar y comparar."
        />
        <Feature
          title="Filtros y búsqueda"
          desc="Encuentra rápidamente lo que te apetece ver hoy."
        />
        <Feature
          title="Detalle por película"
          desc="Información clara para decidir en un vistazo."
        />
      </div>
      <Carrousel/>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-amber-200/10 bg-blue-500 p-3">
      <p className="text-[11px] text-slate-300/70">{label}</p>
      <p className="mt-1 text-sm font-semibold text-amber-50">{value}</p>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-amber-200/10 bg-blue-400 p-5">
      <div className="mb-3 h-px w-10 bg-gradient-to-r from-amber-200/30 to-transparent" />
      <h3 className="text-base font-semibold text-amber-50">{title}</h3>
      <p className="mt-1 text-sm text-slate-200/75">{desc}</p>
    </div>
  );
}

function Hint({ text }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-amber-200/10 bg-lime-200 px-3 py-2">
      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-300/70" />
      <p className="text-sm text-slate-500/75">{text}</p>
    </div>
  );
}
