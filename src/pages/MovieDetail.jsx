import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../services/moviesApi";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setErrorMsg("No se pudo cargar el detalle de la película.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="text-slate-200/70">Cargando detalle...</p>;

  if (errorMsg) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {errorMsg}
      </div>
    );
  }

  if (!movie) return <p className="text-slate-200/70">No existe esta película.</p>;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/movies"
          className="text-sm font-semibold text-amber-100/90 hover:text-amber-50"
        >
          ← Volver al catálogo
        </Link>

        <Link
          to={`/edit-movie/${movie.id}`}
          className="rounded-xl border border-amber-200/15 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 transition"
        >
          Editar
        </Link>
      </div>

      <div className="rounded-2xl border border-amber-200/15 bg-slate-800/35 p-5 sm:p-7">
        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          {/* Poster */}
          <div className="overflow-hidden rounded-2xl border border-amber-200/10 bg-slate-900/30">
            <img
              src={movie.poster}
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x900?text=Kakure+Anime";
              }}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-50">
                {movie.title}
              </h1>

              <p className="mt-2 text-sm text-slate-200/70">
                {movie.year} · {movie.genre}
                {movie.studio ? ` · ${movie.studio}` : ""}
                {movie.duration ? ` · ${movie.duration} min` : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/20 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-amber-100">
                ★ {movie.rating ? Number(movie.rating).toFixed(1) : "—"}
              </span>

              <span className="inline-flex rounded-full border border-amber-200/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100/85">
                {movie.genre}
              </span>

              {movie.studio ? (
                <span className="inline-flex rounded-full border border-amber-200/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100/85">
                  {movie.studio}
                </span>
              ) : null}
            </div>

            <div className="rounded-2xl border border-amber-200/10 bg-slate-900/30 p-4">
              <h3 className="text-sm font-semibold text-amber-50">Sinopsis</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-200/75">
                {movie.synopsis || "Sin sinopsis."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
