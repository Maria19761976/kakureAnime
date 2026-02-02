import { useEffect, useMemo, useState } from "react";
import { getAllMovies, deleteMovie } from "../services/moviesApi";
import MovieCard from "../components/MovieCard";

const LS_KEY = "kakure_movies_filters_v1";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "null");
    } catch {
      return null;
    }
  })();

  const [genre, setGenre] = useState(saved?.genre ?? "ALL");
  const [year, setYear] = useState(saved?.year ?? "ALL");
  const [query, setQuery] = useState(saved?.query ?? "");

  const loadMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "No se pudieron cargar las películas. ¿Está encendido JSON Server?",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ genre, year, query }));
  }, [genre, year, query]);

  const handleDelete = async (id) => {
    const ok = confirm("¿Seguro que quieres borrar esta película?");
    if (!ok) return;

    try {
      await deleteMovie(id);
      await loadMovies();
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar la película.");
    }
  };

  const genres = useMemo(() => {
    const g = new Set(movies.map((m) => m.genre).filter(Boolean));
    return ["ALL", ...Array.from(g).sort()];
  }, [movies]);

  const years = useMemo(() => {
    const y = new Set(
      movies.map((m) => m.year).filter((v) => v !== undefined && v !== null),
    );
    return ["ALL", ...Array.from(y).sort((a, b) => b - a)];
  }, [movies]);

  const filtered = useMemo(() => {
    return movies
      .filter((m) => (genre === "ALL" ? true : m.genre === genre))
      .filter((m) => (year === "ALL" ? true : String(m.year) === String(year)))
      .filter((m) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          (m.title || "").toLowerCase().includes(q) ||
          (m.studio || "").toLowerCase().includes(q) ||
          (m.synopsis || "").toLowerCase().includes(q)
        );
      });
  }, [movies, genre, year, query]);

  const resetFilters = () => {
    setGenre("ALL");
    setYear("ALL");
    setQuery("");
  };

  if (loading) return <p className="text-zinc-400">Cargando películas...</p>;

  if (errorMsg) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {errorMsg}
      </div>
    );
  }

  return (
    <section>
      {}
      <div className="mb-6 rounded-2xl border border-lime-400/15 bg-blue-400 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          {}
          <div>
            <h2 className="text-5xl font-bold text-lime-300 mb-1">Películas</h2>
            <p className="text-sm text-slate-200/80">
              Filtra por género/año o busca por título, estudio o sinopsis.
            </p>

            <p className="mt-2 text-xs text-slate-300/60">
              Mostrando{" "}
              <span className="font-semibold text-amber-50">
                {filtered.length}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-amber-50">
                {movies.length}
              </span>{" "}
              películas
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-4 md:w-auto">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-slate-300/90">Buscar</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: Kimetsu, Ghibli..."
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300/90">Género</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400/40"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g === "ALL" ? "Todos" : g}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300/90">Año</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400/40"
              >
                {years.map((y) => (
                  <option key={String(y)} value={y}>
                    {y === "ALL" ? "Todos" : y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="sm:col-span-4 rounded-xl border-2 border-lime-400 px-4 py-2 text-sm font-semibold text-amber-50 hover:bg-lime-400/30"
            >
              Reset filtros
            </button>
          </div>
        </div>
      </div>


      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          No hay resultados con los filtros actuales.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} showControls/>
          ))}
        </div>
      )}
    </section>
  );
}