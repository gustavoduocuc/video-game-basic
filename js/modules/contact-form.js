// Valida el formulario de contacto y muestra su estado sin recargar.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", handleContactSubmit);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = form.elements["name"];
  const emailInput = form.elements["email"];
  const messageInput = form.elements["message"];
  const statusEl = document.getElementById("contact-form-status");

  const isNameValid = nameInput.value.trim().length > 0;
  const isEmailValid = EMAIL_PATTERN.test(emailInput.value.trim());
  const isMessageValid = messageInput.value.trim().length > 0;

  setFieldValidity(nameInput, isNameValid);
  setFieldValidity(emailInput, isEmailValid);
  setFieldValidity(messageInput, isMessageValid);

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    showFormStatus(statusEl, "Revisa los campos marcados antes de enviar el formulario.", false);
    return;
  }

  showFormStatus(
    statusEl,
    `¡Gracias, ${nameInput.value.trim()}! Tu mensaje fue recibido (demostración: no se envía a un servidor real).`,
    true
  );
  form.reset();
  [nameInput, emailInput, messageInput].forEach((input) => setFieldValidity(input, true));
}

function setFieldValidity(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
}

function showFormStatus(statusEl, message, isSuccess) {
  statusEl.textContent = message;
  statusEl.classList.toggle("text-success", isSuccess);
  statusEl.classList.toggle("text-danger", !isSuccess);
}
