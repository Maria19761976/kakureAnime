import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  return <h1>Movie Detail: {id}</h1>;
}
