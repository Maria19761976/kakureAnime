import { useParams } from "react-router-dom";

export default function EditMovie() {
  const { id } = useParams();
  return <h1>Edit Movie: {id}</h1>;
}
