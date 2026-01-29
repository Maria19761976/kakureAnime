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
{/* Contact Form - Color #BBF451 */}
<div className="relative overflow-hidden rounded-3xl border border-white/20 p-8" style={{ backgroundColor: '#BBF451' }}>
  {/* Decorative elements */}
  <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
  
  <div className="relative space-y-6">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        Envía tu mensaje
      </h2>
      <p className="mt-2 text-gray-800">
        Completa el formulario y te responderemos lo antes posible.
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="sr-only">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full rounded-xl border-2 border-gray-900/20 bg-gray-900/10 px-4 py-3 text-gray-900 placeholder:text-gray-700/60 focus:border-gray-900/40 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border-2 border-gray-900/20 bg-gray-900/10 px-4 py-3 text-gray-900 placeholder:text-gray-700/60 focus:border-gray-900/40 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      <div>
        <label htmlFor="asunto" className="sr-only">Asunto</label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          placeholder="Asunto"
          value={formData.asunto}
          onChange={handleChange}
          required
          className="w-full rounded-xl border-2 border-gray-900/20 bg-gray-900/10 px-4 py-3 text-gray-900 placeholder:text-gray-700/60 focus:border-gray-900/40 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>
    </form>
  </div>
</div>