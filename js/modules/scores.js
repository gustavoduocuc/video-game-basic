// Carga y renderiza la lista dinámica de puntuaciones.
import { formatNumberCL } from "../shared/format.js";
import { fetchJson } from "../shared/http.js";
import { renderErrorWithRetry, renderLoading } from "../shared/status.js";

const SCORES_URL = "assets/data/scores.json";

export function initScoresSection() {
  loadScores();
}

async function loadScores() {
  const resultEl = document.getElementById("puntuaciones-resultado");
  const listEl = document.getElementById("puntuaciones-lista");

  listEl.innerHTML = "";
  renderLoading(resultEl, {
    className: "scores-loading",
    text: "Cargando puntuaciones…",
  });

  try {
    const scores = await fetchJson(SCORES_URL);
    renderScoresList(listEl, scores);
    resultEl.innerHTML = "";
  } catch (error) {
    console.error("[GameVault] No se pudieron cargar las puntuaciones:", error);
    listEl.innerHTML = "";
    renderErrorWithRetry(resultEl, {
      className: "scores-error",
      message: "No pudimos cargar las puntuaciones en este momento. Por favor, inténtalo nuevamente.",
      onRetry: loadScores,
    });
  }
}

function renderScoresList(listEl, scores) {
  scores.forEach((score) => {
    const item = document.createElement("li");
    item.className = "scores-item";
    item.textContent = `${score.jugador} — ${score.juego}: ${formatNumberCL(score.puntaje)} pts`;
    listEl.appendChild(item);
  });
}
