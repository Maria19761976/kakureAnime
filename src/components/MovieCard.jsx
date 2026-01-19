import { Link } from "react-router-dom";

export default function MovieCard({ movie, onDelete }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200/10 bg-slate-800/30">
      <Link to={`/movies/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-900/30">
          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x900?text=Kakure+Anime";
            }}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-slate-50">{movie.title}</h3>
        <p className="text-xs text-slate-200/70">
          {movie.year} · {movie.genre}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to={`/edit-movie/${movie.id}`}
            className="rounded-lg border border-slate-200/15 px-3 py-2 text-center text-xs font-semibold text-slate-100 hover:bg-white/5"
          >
            Editar
          </Link>

          <button
            onClick={() => onDelete(movie.id)}
            className="rounded-lg bg-amber-200/90 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-200"
          >
            Borrar
          </button>
        </div>
      </div>
    </article>
  );
}
