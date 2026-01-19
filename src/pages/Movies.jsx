import { useEffect, useState } from "react";
import { getAllMovies, deleteMovie } from "../services/moviesApi";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadMovies = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudieron cargar las películas. ¿Está encendido JSON Server?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

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

  if (loading) return <p className="text-slate-200/70">Cargando películas...</p>;
  if (errorMsg) return <p className="text-red-300">{errorMsg}</p>;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-amber-50">Movies</h1>
        <p className="text-sm text-slate-200/70">
          Mostrando <span className="font-semibold text-amber-50">{movies.length}</span> películas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}
