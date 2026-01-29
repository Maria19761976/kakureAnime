import { Link } from "react-router-dom";
import { useState } from "react";

export default function Location() {
  return (
    <section className="space-y-8" style={{ backgroundColor: '#2B7FFF', minHeight: '100vh', padding: '2rem 0' }}>
      {/* Content will go here */}
    </section>
  );
}
{/* Header - Color #50A2FF */}
<div className="relative overflow-hidden rounded-3xl border border-[#50A2FF]/30 p-8" style={{ backgroundColor: '#50A2FF' }}>
  {/* Decorative glows */}
  <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
  
  {/* Top border line */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

  <div className="relative">
    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
      Contacto
    </h1>
    <p className="mt-3 text-lg text-white/90">
      ¿Tienes alguna sugerencia o pregunta? Nos encantaría escucharte.
    </p>
  </div>
</div>
const [formData, setFormData] = useState({
  nombre: "",
  email: "",
  asunto: "",
  mensaje: ""
});

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí iría la lógica de envío del formulario
  console.log("Form submitted:", formData);
  alert("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
  setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};