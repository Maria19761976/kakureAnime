import { NavLink } from "react-router-dom";

const base =
  "px-3 py-2 rounded-xl text-sm font-semibold transition border";
const active =
  "border-amber-200/30 bg-amber-200/10 text-amber-50";
const idle =
  "border-transparent text-slate-200/70 hover:text-slate-100 hover:bg-white/5";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/10 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-[2200px] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-10 py-3">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200/15 bg-white/5 text-amber-200 font-bold">
            K
          </span>
          <span className="text-sm sm:text-base font-semibold tracking-wide text-amber-50">
            Kakure Anime
          </span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/movies", label: "Movies" },
            { to: "/add-movie", label: "Add" },
            { to: "/location", label: "Location" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `${base} ${isActive ? active : idle}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
