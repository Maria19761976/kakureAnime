import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie, getAllMovies } from '../services/moviesApi';
import MovieCard from '../components/MovieCard';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
        
        const movies = await getAllMovies();
        setAllMovies(movies);
      } catch (err) {
        console.error(err);
        setErrorMessage('No se pudo cargar la película. ¿Está encendido JSON Server?');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = confirm('¿Seguro que quieres borrar esta película?');
    if (!isConfirmed) return;

    try {
      await deleteMovie(id);
      navigate('/movies');
    } catch (err) {
      console.error(err);
      alert('No se pudo borrar la película.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-lime-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-300">Cargando película...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
        <p className="font-semibold mb-2">Error</p>
        <p>{errorMessage}</p>
        <Link 
          to="/movies"
          className="mt-4 inline-block text-sm text-red-300 hover:text-red-200 underline"
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200">
        <p>Película no encontrada</p>
        <Link 
          to="/movies"
          className="mt-4 inline-block text-sm text-amber-300 hover:text-amber-200 underline"
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const relatedMovies = allMovies
    .filter(m => m.id !== movie.id && m.genre === movie.genre)
    .slice(0, 6);

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-lime-500/15 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lime-500/5 blur-3xl" />        
        <div className="relative grid gap-8 lg:grid-cols-[300px_1fr] items-start">
          <div className="rounded-2xl overflow-hidden border border-cyan-200/20 bg-slate-900/40 p-3">
            {movie.poster ? (
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-auto rounded-xl object-cover shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=Sin+Poster';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-xl">
                <p className="text-slate-400">Sin poster</p>
              </div>
            )}
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-lime-400">
              {movie.title}
            </h1>
            
            {movie.quote && (
              <blockquote className="border-l-4 border-amber-500 bg-amber-500/10 pl-6 py-3 italic text-amber-200/90 text-lg">
                "{movie.quote}"
              </blockquote>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to={`/edit-movie/${movie.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-lime-500/20 bg-lime-500/10 px-5 py-2.5 text-sm font-semibold text-lime-500 hover:bg-lime-500/15 transition-colors"
              >
                ✏️ Editar
              </Link>

              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-xl border border-pink-500/20 bg-pink-500/10 px-5 py-2.5 text-sm font-semibold text-pink-400 hover:bg-pink-500/15 transition-colors"
              >
                🗑️ Eliminar
              </button>

              <Link
                to="/movies"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200/10 bg-slate-900/20 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900/30 transition-colors"
              >
                ← Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-coral-500/15 bg-gradient-to-br from-coral-500/5 to-slate-800/30 p-8">
        <h2 className="text-2xl font-bold text-coral-400 mb-4 flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-coral-500 to-transparent rounded-full" />
          Sinopsis
        </h2>
        <p className="text-slate-200/80 leading-relaxed text-lg">
          {movie.synopsis || 'No hay sinopsis disponible.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-amber-500/15 bg-slate-800/40 p-6">
          <h3 className="text-xl font-bold text-amber-400 mb-4">Detalles</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Año" value={movie.year || 'N/A'} />
            <StatCard label="Duración" value={`${movie.duration || 0} min`} />
            <StatCard label="Estudio" value={movie.studio || 'N/A'} />
            <StatCard label="Género" value={movie.genre || 'N/A'} />
          </div>
        </div>

        <div className="rounded-3xl border border-lime-500/15 bg-gradient-to-br from-lime-500/10 to-slate-800/40 p-6 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-300/70 mb-2">RATING</p>
          <div className="text-7xl font-bold text-lime-400">
            {movie.rating || '—'}
          </div>
          <p className="text-slate-300/60 mt-2">{movie.rating ? '/ 10' : 'Sin calificación'}</p>
        </div>
      </div>

      {movie.gallery && movie.gallery.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-lime-400">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {movie.gallery.map((imgUrl, index) => (
              <div 
                key={index}
                className="aspect-video rounded-2xl border border-cyan-200/15 bg-slate-900/20 overflow-hidden"
              >
                <img 
                  src={imgUrl} 
                  alt={`${movie.title} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250/1e293b/94a3b8?text=Imagen';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedMovies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-amber-400">Películas relacionadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedMovies.map((relatedMovie) => (
              <MovieCard key={relatedMovie.id} movie={relatedMovie} showControls={false} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-cyan-200/15 bg-slate-900/40 p-4">
      <p className="text-xs text-slate-300/70 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-base font-bold text-cyan-200">{value}</p>
    </div>
  );
}
