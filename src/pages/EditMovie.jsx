import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

  if (loading) return <p className="text-slate-200/70">Cargando...</p>;

  if (errorMsg) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-amber-50">
            Editar película
          </h1>
          <Link
            to="/movies"
            className="text-sm font-semibold text-amber-100/90 hover:text-amber-50"
          >
            ← Volver
          </Link>
        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {errorMsg}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-50">
            Editar película
          </h1>
          <p className="mt-1 text-sm text-slate-200/70">
            Actualiza la información y guarda cambios.
          </p>
        </div>

        <Link
          to={`/movies/${id}`}
          className="text-sm font-semibold text-amber-100/90 hover:text-amber-50"
        >
          ← Volver al detalle
        </Link>
      </div>

      <div className="rounded-2xl border border-amber-200/15 bg-slate-800/35 p-5 sm:p-7">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Título *">
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Ej: Spirited Away"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>

            <Field label="Año">
              <input
                name="year"
                value={form.year}
                onChange={onChange}
                type="number"
                placeholder="Ej: 2001"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>

            <Field label="Duración (min)">
              <input
                name="duration"
                value={form.duration}
                onChange={onChange}
                type="number"
                placeholder="Ej: 125"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>

            <Field label="Rating">
              <input
                name="rating"
                value={form.rating}
                onChange={onChange}
                type="number"
                step="0.1"
                placeholder="Ej: 8.6"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>

            <Field label="Género">
              <input
                name="genre"
                value={form.genre}
                onChange={onChange}
                placeholder="Ej: Fantasía"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>

            <Field label="Studio">
              <input
                name="studio"
                value={form.studio}
                onChange={onChange}
                placeholder="Ej: Studio Ghibli"
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </Field>
          </div>

          <Field label="Poster (URL)">
            <input
              name="poster"
              value={form.poster}
              onChange={onChange}
              placeholder="Ej: https://cdn.myanimelist.net/images/anime/..."
              className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
            />
          </Field>

          <Field label="Sinopsis">
            <textarea
              name="synopsis"
              value={form.synopsis}
              onChange={onChange}
              rows={5}
              placeholder="Resumen breve de la película..."
              className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
            />
          </Field>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-amber-200 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-100 disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-amber-200/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-xs font-semibold text-slate-200/70">{label}</span>
      {children}
    </label>
  );
}
