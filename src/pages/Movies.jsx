import { useEffect, useState } from "react";
import { getAllMovies } from "../services/moviesApi";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");
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
    }

    load();
  }, []);

  if (loading) return <p>Cargando películas...</p>;

  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <section>
      <h1>Movies</h1>

      <p>
        Mostrando <strong>{movies.length}</strong> películas
      </p>

      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <Link to={`/movies/${m.id}`}>
              {m.title} ({m.year}) — {m.genre}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
