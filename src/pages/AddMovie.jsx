import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/moviesApi";

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

export default function AddMovie() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      id: crypto.randomUUID(),
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
      await createMovie(payload);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo crear la película.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h1>Add Movie</h1>
      {errorMsg ? <p>{errorMsg}</p> : null}

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

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Crear"}
        </button>
      </form>
    </section>
  );
}
