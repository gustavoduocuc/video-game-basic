const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isFilled(value) {
  return value.trim().length > 0;
}

// Cada validador devuelve { campo: true } solo para los campos inválidos.
export function validateContact(values) {
  const errors = {};
  if (!isFilled(values.name)) errors.name = true;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = true;
  if (!isFilled(values.message)) errors.message = true;
  return errors;
}

export function validateProduct(values) {
  const errors = {};
  const price = Number(values.price);
  if (!isFilled(values.name)) errors.name = true;
  if (!values.categorySlug) errors.categorySlug = true;
  if (!Number.isInteger(price) || price <= 0) errors.price = true;
  if (!isFilled(values.description)) errors.description = true;
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
