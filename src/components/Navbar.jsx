import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/movies", label: "Películas" },
  { to: "/add-movie", label: "Agregar película" },
  { to: "/location", label: "Ubicación" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50">

      <div className="border-b border-lime-700 bg-lime-300/70 backdrop-blur supports-[backdrop-filter]:bg-lime-300/80">
        <div className="mx-auto w-full max-w-[2200px] px-4 sm:px-6 lg:px-8 2xl:px-10">
          <div className="flex h-14 items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <NavLink to="/" className="group inline-flex items-center gap-2">
                <span className="relative grid h-8 w-8 place-items-center rounded-xl border border-amber-200/15 bg-amber-200/10">
                  <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-amber-50">
                  Kakure Anime
                </span>
              </NavLink>

            </div>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} label={l.label} />
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-amber-200/15 bg-slate-900/20 px-3 py-2 text-xs font-semibold text-amber-50 hover:bg-slate-900/30"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>

        {}
        <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
      </div>

      {}
      {open && (
        <div className="md:hidden border-b border-amber-200/10 bg-slate-950/45 backdrop-blur">
          <div className="mx-auto w-full max-w-[2200px] px-4 sm:px-6 lg:px-8 2xl:px-10 py-3">
            <div className="grid gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "border-amber-200/30 bg-amber-200/10 text-amber-50"
                        : "border-amber-200/10 bg-slate-900/15 text-slate-200/85 hover:bg-slate-900/25",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative rounded-xl px-3 py-2 text-sm font-semibold transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/30",
          isActive
            ? "text-amber-50 bg-amber-200/10 border border-amber-200/20"
            : "text-slate-200/80 hover:text-amber-50 hover:bg-slate-900/20 border border-transparent",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={[
              "pointer-events-none absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent transition",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            ].join(" ")}
          />
        </>
      )}
    </NavLink>
  );
}
