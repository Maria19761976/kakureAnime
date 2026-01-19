import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

export async function getAllMovies() {
  const res = await api.get("/movies");
  return res.data;
}
