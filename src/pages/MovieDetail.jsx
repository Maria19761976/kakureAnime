import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../services/moviesApi";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setErrorMsg("No se pudo cargar el detalle de la película.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="text-zinc-400">Cargando detalle...</p>;

  if (!movie) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {errorMsg || "No encontrada."}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{movie.title}</h2>
          <p className="text-sm text-zinc-400">
            {movie.year} · {movie.genre} · {movie.duration} min · ⭐ {movie.rating}
          </p>
        </div>

        <Link
          to="/movies"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5"
        >
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="aspect-[2/3] bg-black/40">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 text-sm text-zinc-300 space-y-1">
            <p>
              <span className="text-zinc-400">Studio:</span> {movie.studio || "—"}
            </p>
            <p>
              <span className="text-zinc-400">ID:</span> {movie.id}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {movie.synopsis || "Sinopsis no disponible."}
          </p>
        </div>
      </div>
    </section>
  );
}
