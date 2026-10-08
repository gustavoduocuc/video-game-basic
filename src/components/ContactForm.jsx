import { useForm } from "../hooks/useForm.js";
import { validateContact } from "../utils/validation.js";

const EMPTY_VALUES = { name: "", email: "", message: "" };

export function ContactForm() {
  const form = useForm(EMPTY_VALUES, validateContact);

  const handleSubmit = (event) =>
    form.submit(event, {
      invalidMessage: "Revisa los campos marcados antes de enviar el formulario.",
      onValid: (values) =>
        `¡Gracias, ${values.name.trim()}! Tu mensaje fue recibido (demostración: no se envía a un servidor real).`,
    });

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="contact-name" className="form-label">Nombre</label>
        <input
          type="text"
          className={form.fieldClass("name")}
          id="contact-name"
          name="name"
          required
          value={form.values.name}
          onChange={form.handleChange}
        />
        <p className="invalid-feedback">Por favor ingresa tu nombre.</p>
      </div>
      <div className="mb-3">
        <label htmlFor="contact-email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className={form.fieldClass("email")}
          id="contact-email"
          name="email"
          required
          value={form.values.email}
          onChange={form.handleChange}
        />
        <p className="invalid-feedback">Ingresa un correo electrónico válido.</p>
      </div>
      <div className="mb-3">
        <label htmlFor="contact-message" className="form-label">Mensaje</label>
        <textarea
          className={form.fieldClass("message")}
          id="contact-message"
          name="message"
          rows={3}
          required
          value={form.values.message}
          onChange={form.handleChange}
        ></textarea>
        <p className="invalid-feedback">Por favor escribe tu mensaje.</p>
      </div>
      <button type="submit" className="btn btn-primary">Enviar mensaje</button>
      <p id="contact-form-status" className={`mt-3${form.statusClass}`} role="status" aria-live="polite">
        {form.status?.message}
      </p>
    </form>
  );
}
