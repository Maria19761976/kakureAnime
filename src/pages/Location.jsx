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
<div>
  <label htmlFor="mensaje" className="sr-only">Mensaje</label>
  <textarea
    id="mensaje"
    name="mensaje"
    placeholder="Mensaje"
    value={formData.mensaje}
    onChange={handleChange}
    required
    rows={5}
    className="w-full resize-none rounded-xl border-2 border-gray-900/20 bg-gray-900/10 px-4 py-3 text-gray-900 placeholder:text-gray-700/60 focus:border-gray-900/40 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
  />
</div>

<button
  type="submit"
  className="w-full rounded-xl border-2 border-white/40 bg-white px-6 py-3.5 font-bold text-gray-900 shadow-lg transition-all hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
>
  Enviar mensaje
</button>
{/* Map Section - Color #2B7FFF */}
<div className="relative overflow-hidden rounded-3xl border border-white/20" style={{ backgroundColor: '#2B7FFF' }}>
  {/* Decorative glow */}
  <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
  
  <div className="relative h-full min-h-[500px] lg:min-h-full">
    {/* Map Container */}
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      <iframe
        title="Ubicación Kakure Anime"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50449.57634446334!2d-0.9435468999999999!3d38.08888895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63b7613562a515%3A0x40e0c801e0dbe40!2sOrihuela%2C%20Alicante%2C%20Spain!5e0!3m2!1sen!2s!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="brightness-95 contrast-110 saturate-110"
      />
    </div>

    {/* Map overlay decoration */}
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
  </div>
</div>
function ContactInfoCard({ icon, title, info }) {
  return (
    <div className="rounded-2xl border border-gray-900/20 bg-gray-900/10 p-5 backdrop-blur-sm transition-transform hover:scale-[1.02]">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-3 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-1">
        {info.map((line, index) => (
          <p key={index} className="text-sm text-gray-800">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
{/* Contact Information Section - Color #BBF451 */}
<div className="relative overflow-hidden rounded-3xl border border-white/20 p-8" style={{ backgroundColor: '#BBF451' }}>
  {/* Decorative elements */}
  <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
  
  <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {/* Dirección */}
    <ContactInfoCard
      icon="📍"
      title="Dirección"
      info={["Calle Anime 123", "03300 Orihuela", "Alicante, España"]}
    />
    
    {/* Teléfono */}
    <ContactInfoCard
      icon="📞"
      title="Teléfono"
      info={["+34 965 123 456", "+34 612 345 678"]}
    />
    
    {/* Correo */}
    <ContactInfoCard
      icon="📧"
      title="Correo"
      info={["info@kakureanime.com", "contacto@kakureanime.com"]}
    />
    
    {/* Horario */}
    <ContactInfoCard
      icon="🕐"
      title="Horario"
      info={["Lun - Vie: 9:00 - 18:00", "Sáb: 10:00 - 14:00", "Dom: Cerrado"]}
    />
  </div>
</div>
// Eliminar estas líneas:
function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-900/20 bg-gray-900/10 px-3 py-2 text-center">
      <p className="text-[10px] font-medium text-gray-800">{label}</p>
      <p className="mt-0.5 text-xs font-bold text-gray-900">{value}</p>
    </div>
  );
}