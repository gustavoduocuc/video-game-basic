// Respeta la preferencia del sistema de reducir animaciones al desplazar la página.
export function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}
