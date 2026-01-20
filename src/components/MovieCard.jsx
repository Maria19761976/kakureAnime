import { Link } from "react-router-dom";

export default function MovieCard({ movie, onDelete }) {
  const rating = Number(movie.rating || 0);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/10 bg-slate-800/35 transition will-change-transform hover:-translate-y-1 hover:border-amber-200/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      {}
      <Link to={`/movies/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-950/20 max-h-[360px]">
          {}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x900?text=Kakure+Anime";
            }}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.05]"
          />

          {}
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/20 bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-amber-100 backdrop-blur">
              <span className="text-amber-200">★</span>
              {rating ? rating.toFixed(1) : "—"}
            </span>
          </div>

          {}
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex rounded-full border border-amber-200/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-100/85 backdrop-blur">
              {movie.genre}
            </span>
          </div>
        </div>
      </Link>

      {}
      <div className="p-3 space-y-1.5">
        <Link to={`/movies/${movie.id}`}>
          <h3 className="text-sm sm:text-base font-semibold leading-tight text-amber-50 transition group-hover:text-amber-100">
            {movie.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-slate-200/70">
          {movie.year} · {movie.studio || "—"}
        </p>

        {}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to={`/edit-movie/${movie.id}`}
            className="rounded-xl border border-amber-200/15 bg-white/0 px-3 py-2 text-center text-xs sm:text-sm font-semibold text-slate-100/90 transition hover:bg-white/5 hover:border-amber-200/25"
          >
            Editar
          </Link>

          <button
            onClick={() => onDelete(movie.id)}
            className="rounded-xl bg-amber-200/90 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Borrar
          </button>
        </div>
      </div>

      {}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-200/70 to-transparent opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}
