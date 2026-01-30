import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie } from '../services/moviesApi';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
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

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
      
      <div className="flex gap-4">
        <Link
          to={`/edit-movie/${movie.id}`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Editar
        </Link>
        
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Eliminar
        </button>
        
        <Link
          to="/movies"
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Volver
        </Link>
      </div>
    </section>
  );
}