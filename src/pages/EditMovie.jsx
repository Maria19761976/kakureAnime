import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/moviesApi";

const initial = {
  title: "",
  year: "",
  duration: "",
  genre: "",
  studio: "",
  rating: "",
  poster: "",
  synopsis: "",
};

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");
        const data = await getMovieById(id);

        setForm({
          title: data.title ?? "",
          year: data.year ?? "",
          duration: data.duration ?? "",
          genre: data.genre ?? "",
          studio: data.studio ?? "",
          rating: data.rating ?? "",
          poster: data.poster ?? "",
          synopsis: data.synopsis ?? "",
        });
      } catch (err) {
        console.error(err);
        setErrorMsg("No se pudo cargar la película para editar.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title.trim()) {
      setErrorMsg("El título es obligatorio.");
      return;
    }

    const payload = {
      id,
      title: form.title.trim(),
      year: form.year ? Number(form.year) : undefined,
      duration: form.duration ? Number(form.duration) : undefined,
      genre: form.genre.trim() || "",
      studio: form.studio.trim() || "",
      rating: form.rating ? Number(form.rating) : undefined,
      poster: form.poster.trim() || "",
      synopsis: form.synopsis.trim() || "",
    };

    try {
      setSaving(true);
      await updateMovie(id, payload);
      navigate(`/movies/${id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo actualizar la película.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <section>
      <h1>Edit Movie</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label>
          Título *
          <input name="title" value={form.title} onChange={onChange} />
        </label>

        <label>
          Año
          <input name="year" value={form.year} onChange={onChange} type="number" />
        </label>

        <label>
          Duración (min)
          <input name="duration" value={form.duration} onChange={onChange} type="number" />
        </label>

        <label>
          Género
          <input name="genre" value={form.genre} onChange={onChange} />
        </label>

        <label>
          Studio
          <input name="studio" value={form.studio} onChange={onChange} />
        </label>

        <label>
          Rating
          <input name="rating" value={form.rating} onChange={onChange} type="number" step="0.1" />
        </label>

        <label>
          Poster (URL)
          <input name="poster" value={form.poster} onChange={onChange} />
        </label>

        <label>
          Sinopsis
          <textarea name="synopsis" value={form.synopsis} onChange={onChange} rows={4} />
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

          <button type="button" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
