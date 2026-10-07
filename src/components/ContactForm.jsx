import { useState } from "react";
import { hasErrors, validateContact } from "../utils/validation.js";

const EMPTY_VALUES = { name: "", email: "", message: "" };
const INITIAL_STATE = { values: EMPTY_VALUES, errors: {}, status: null };

export function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateContact(form.values);

    if (hasErrors(errors)) {
      setForm((prev) => ({
        ...prev,
        errors,
        status: { isSuccess: false, message: "Revisa los campos marcados antes de enviar el formulario." },
      }));
      return;
    }

    setForm({
      ...INITIAL_STATE,
      status: {
        isSuccess: true,
        message: `¡Gracias, ${form.values.name.trim()}! Tu mensaje fue recibido (demostración: no se envía a un servidor real).`,
      },
    });
  };

  const fieldClass = (field) => `form-control${form.errors[field] ? " is-invalid" : ""}`;
  const statusClass = form.status ? (form.status.isSuccess ? " text-success" : " text-danger") : "";

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="contact-name" className="form-label">Nombre</label>
        <input
          type="text"
          className={fieldClass("name")}
          id="contact-name"
          name="name"
          required
          value={form.values.name}
          onChange={handleChange}
        />
        <p className="invalid-feedback">Por favor ingresa tu nombre.</p>
      </div>
      <div className="mb-3">
        <label htmlFor="contact-email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className={fieldClass("email")}
          id="contact-email"
          name="email"
          required
          value={form.values.email}
          onChange={handleChange}
        />
        <p className="invalid-feedback">Ingresa un correo electrónico válido.</p>
      </div>
      <div className="mb-3">
        <label htmlFor="contact-message" className="form-label">Mensaje</label>
        <textarea
          className={fieldClass("message")}
          id="contact-message"
          name="message"
          rows={3}
          required
          value={form.values.message}
          onChange={handleChange}
        ></textarea>
        <p className="invalid-feedback">Por favor escribe tu mensaje.</p>
      </div>
      <button type="submit" className="btn btn-primary">Enviar mensaje</button>
      <p id="contact-form-status" className={`mt-3${statusClass}`} role="status" aria-live="polite">
        {form.status?.message}
      </p>
    </form>
  );
}
