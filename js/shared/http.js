// Centraliza solicitudes JSON y el mensaje técnico para respuestas no exitosas.
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Respuesta no exitosa del servidor (status ${response.status})`);
  }
  return response.json();
}
