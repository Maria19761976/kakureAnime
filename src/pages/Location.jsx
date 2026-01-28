// src/pages/Location.jsx
import { Link } from "react-router-dom";

export default function Location() {
  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/15 bg-slate-800/35 p-6 sm:p-10">
        {/* blobs decorativos */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Texto */}
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-slate-900/20 px-3 py-1 text-xs text-slate-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
              Kakure Anime • Ubicación
            </p>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-amber-50">
              Dónde encontrarnos
            </h1>

            <p className="max-w-prose text-slate-200/80">
              Kakure Anime es un proyecto académico con espíritu de videoclub.
              Aquí tienes nuestra ubicación ficticia y la información básica
              para situarte.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/movies"
                className="inline-flex items-center justify-center rounded-xl border border-amber-200/20 bg-amber-200/10 px-5 py-2.5 text-sm font-semibold text-amber-50 hover:bg-amber-200/15"
              >
                Ver catálogo
              </Link>

              <Link
                to="/add-movie"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200/10 bg-slate-900/20 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900/30"
              >
                Añadir recomendación
              </Link>
            </div>
          </div>

          {/* Tarjeta info */}
          <div className="relative">
            <div className="rounded-3xl border border-amber-200/15 bg-slate-900/20 p-5 space-y-4">
              <div>
                <p className="text-xs text-slate-300/70">Dirección</p>
                <p className="mt-1 text-sm font-semibold text-amber-50">
                  Calle Ejemplo 123, 08000 – Barcelona
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-300/70">Horario</p>
                <ul className="mt-1 text-sm text-slate-200/80 space-y-1">
                  <li>L–V: 10:00 – 20:00</li>
                  <li>Sábado: 11:00 – 19:00</li>
                  <li>Domingo: cerrado</li>
                </ul>
              </div>

              <div>
                <p className="text-xs text-slate-300/70">Contacto</p>
                <p className="mt-1 text-sm text-slate-200/80">
                  contacto@kakureanime.dev
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-8 -bottom-3 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />
          </div>
        </div>
      </div>

      {/* Mapa + notas */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 overflow-hidden rounded-2xl border border-amber-200/10 bg-slate-900/15">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-amber-50">Mapa</h2>
            <p className="mt-1 text-sm text-slate-200/75">
              Placeholder de mapa (puedes incrustar Google Maps más adelante).
            </p>
          </div>
          <div className="h-64 w-full bg-slate-950/40 grid place-items-center text-slate-400 text-sm">
            MAPA
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200/10 bg-slate-800/25 p-5">
          <h3 className="text-base font-semibold text-amber-50">
            Sobre el proyecto
          </h3>
          <p className="mt-2 text-sm text-slate-200/75">
            Kakure Anime es una aplicación React con routing, API fake y CRUD
            completo, desarrollada como proyecto académico.
          </p>
        </div>
      </div>
    </section>
  );
}
