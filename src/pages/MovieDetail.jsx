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

  if (loading) return <p>Cargando detalle...</p>;

  if (errorMsg) return <p>{errorMsg}</p>;

  if (!movie) return <p>No existe esta película.</p>;

  return (
    <section>
      <p>
        <Link to="/movies">← Volver a Movies</Link>
      </p>

      <h1>{movie.title}</h1>

      <p>
        <strong>Año:</strong> {movie.year} · <strong>Género:</strong> {movie.genre}
        {movie.studio ? (
          <>
            {" "}
            · <strong>Studio:</strong> {movie.studio}
          </>
        ) : null}
      </p>

      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ maxWidth: 320, width: "100%", borderRadius: 12, marginTop: 12 }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      {movie.synopsis ? (
        <>
          <h3 style={{ marginTop: 16 }}>Sinopsis</h3>
          <p>{movie.synopsis}</p>
        </>
      ) : null}
    </section>
  );
}
