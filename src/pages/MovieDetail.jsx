import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, getMovieById } from "../services/moviesApi";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        setErrorMsg("No se pudo cargar el detalle.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const onDelete = async () => {
    const ok = confirm("¿Seguro que quieres borrar esta película?");
    if (!ok) return;

    try {
      await deleteMovie(id);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar la película.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!movie) return <p>No encontrada.</p>;

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ marginRight: "auto" }}>{movie.title}</h1>

        <Link to={`/edit-movie/${movie.id}`}>Editar</Link>
        <button type="button" onClick={onDelete}>
          Borrar
        </button>
      </div>

      <p>
        {movie.year ? `${movie.year} — ` : ""}
        {movie.genre || ""}
      </p>

      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: 260, height: 360, objectFit: "cover", borderRadius: 8 }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      {movie.studio ? <p><strong>Studio:</strong> {movie.studio}</p> : null}
      {movie.duration ? <p><strong>Duración:</strong> {movie.duration} min</p> : null}
      {movie.rating ? <p><strong>Rating:</strong> {movie.rating}</p> : null}

      {movie.synopsis ? <p style={{ maxWidth: 720 }}>{movie.synopsis}</p> : null}

      <p>
        <Link to="/movies">Volver a Movies</Link>
      </p>
    </section>
  );
}
