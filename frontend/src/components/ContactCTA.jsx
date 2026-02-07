import React, { useState } from "react";
import { contactData } from "../mock";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Send, Check } from "lucide-react";
import { toast } from "sonner";

export const ContactCTA = () => {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setLoading(true);
    // Mock submission - saves to localStorage
    setTimeout(() => {
      const contacts = JSON.parse(localStorage.getItem("core_contacts") || "[]");
      contacts.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem("core_contacts", JSON.stringify(contacts));
      setSubmitted(true);
      setLoading(false);
      toast.success("Consulta enviada correctamente");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 800);
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-[#F2F3D9] reveal-section"
    >
      <div className="max-w-[640px] mx-auto px-6 md:px-10 text-center">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-black mb-5 tracking-tight">
          {contactData.title}
        </h2>
        <p className="text-[15px] md:text-[18px] text-black/55 leading-[1.6] mb-10 md:mb-14">
          {contactData.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-[13px] font-medium text-black/60 mb-1.5">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-black/8 text-[15px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#D2FDFE] transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-black/60 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-black/8 text-[15px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#D2FDFE] transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[13px] font-medium text-black/60 mb-1.5">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tu proyecto"
              rows={4}
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-black/8 text-[15px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#D2FDFE] resize-none transition-shadow duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading || submitted}
            className="w-full bg-[#D2FDFE] text-black text-[15px] font-semibold px-6 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {submitted ? (
              <>
                <Check size={18} />
                Enviado
              </>
            ) : loading ? (
              "Enviando..."
            ) : (
              <>
                <Send size={16} />
                {contactData.ctaText}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
