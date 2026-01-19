import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

export async function getAllMovies() {
  const res = await api.get("/movies");
  return res.data;
}

export async function getMovieById(id) {
  const res = await api.get(`/movies/${id}`);
  return res.data;
}

export async function createMovie(payload) {
  const res = await api.post("/movies", payload);
  return res.data;
}

export async function updateMovie(id, payload) {
  const res = await api.put(`/movies/${id}`, payload);
  return res.data;
}

export async function deleteMovie(id) {
  await api.delete(`/movies/${id}`);
}
