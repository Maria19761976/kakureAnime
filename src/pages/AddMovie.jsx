import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-50">
            Añadir película
          </h1>
          <p className="mt-1 text-sm text-slate-200/70">
            Completa los datos para añadirla al catálogo.
          </p>
        </div>

        <Link
          to="/movies"
          className="text-sm font-semibold text-amber-100/90 hover:text-amber-50"
        >
          ← Volver
        </Link>
      </div>

      <div className="rounded-2xl border border-amber-200/15 bg-slate-800/35 p-5 sm:p-7">
        {errorMsg ? (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {errorMsg}
          </div>
        ) : null}

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
              {saving ? "Guardando..." : "Crear"}
            </button>

            <Link
              to="/movies"
              className="rounded-xl border border-amber-200/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5 transition"
            >
              Cancelar
            </Link>
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
