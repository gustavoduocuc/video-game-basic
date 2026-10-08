import { useState } from "react";
import { hasErrors } from "../utils/validation.js";

// validate(values) devuelve { campo: true } por cada campo inválido.
export function useForm(emptyValues, validate) {
  const [form, setForm] = useState({ values: emptyValues, errors: {}, status: null });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));
  };

  // onValid recibe los valores válidos y devuelve el mensaje de éxito; el formulario se limpia después.
  const submit = (event, { invalidMessage, onValid }) => {
    event.preventDefault();
    const errors = validate(form.values);

    if (hasErrors(errors)) {
      setForm((prev) => ({ ...prev, errors, status: { isSuccess: false, message: invalidMessage } }));
      return;
    }

    const successMessage = onValid(form.values);
    setForm({ values: emptyValues, errors: {}, status: { isSuccess: true, message: successMessage } });
  };

  const fieldClass = (field, base = "form-control") => `${base}${form.errors[field] ? " is-invalid" : ""}`;
  const statusClass = form.status ? (form.status.isSuccess ? " text-success" : " text-danger") : "";

  return { values: form.values, status: form.status, handleChange, submit, fieldClass, statusClass };
}
