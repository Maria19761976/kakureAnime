import { NavLink } from "react-router-dom";

const linkBase = "text-sm font-semibold";
const linkInactive = "opacity-70 hover:opacity-100";
const linkActive = "opacity-100 underline";

export default function Navbar() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <NavLink to="/" className={`${linkBase} ${linkInactive}`}>
          Kakure Anime
        </NavLink>

        <div style={{ display: "flex", gap: "12px", marginLeft: "12px" }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/add-movie"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Add
          </NavLink>

          <NavLink
            to="/location"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Location
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
