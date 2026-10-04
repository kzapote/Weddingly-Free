import React, { useState } from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const attendance = formData.get("attendance") as string;
    const guests = formData.get("guests") as string;
    const message = formData.get("message") as string;

    if (!name || !attendance || !guests) {
      alert("Por favor, llena los campos principales.");
      setLoading(false);
      return;
    }

    // 📱 CONFIGURACIÓN DE WHATSAPP
    // Reemplaza el número de abajo por tu número de WhatsApp con el código de tu país (ej. 502 para Guatemala) sin espacios ni el signo +
    const numeroTelefono = "50257004869"; 

    // Estructura del mensaje de texto para WhatsApp
    const textoMensaje = `¡Hola! Confirmo mi asistencia a la boda:%0A%0A` +
                         `*Nombre:* ${encodeURIComponent(name)}%0A` +
                         `*¿Asistiré?:* ${encodeURIComponent(attendance)}%0A` +
                         `*Cantidad de invitados:* ${encodeURIComponent(guests)}%0A` +
                         `*Mensaje:* ${encodeURIComponent(message || "Sin mensaje")}`;

    // Abre WhatsApp en una nueva pestaña
    window.open(`https://wa.me{numeroTelefono}?text=${textoMensaje}`, "_blank");
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white text-left">
          Nombre completo
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="attendance" className="block text-sm font-medium text-white text-left">
          ¿Confirmas tu asistencia?
        </label>
        <select
          id="attendance"
          name="attendance"
          className="block w-full p-2 mt-1 bg-black/40 text-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Sí, asistiré con gusto">Sí, asistiré con gusto</option>
          <option value="Lo siento, no podré asistir">Lo siento, no podré asistir</option>
        </select>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-white text-left">
          ¿Cuántas personas asisten contigo?
        </label>
        <select
          id="guests"
          name="guests"
          className="block w-full p-2 mt-1 bg-black/40 text-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
          required
        >
          <option value="">Selecciona cantidad</option>
          <option value="Solo yo (1)">Solo yo (1)</option>
          <option value="2 personas">2 personas</option>
          <option value="3 personas">3 personas</option>
          <option value="4 personas">4 personas</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white text-left">
          Dedicatoria o mensaje especial (Opcional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="block w-full p-2 text-sm font-medium text-center text-black bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-200 transition-colors cursor-pointer"
          disabled={loading} 
        >
          {loading ? "Enviando..." : "Confirmar por WhatsApp"} 
        </button>
      </div>
    </form>
  );
};

export default Form;
