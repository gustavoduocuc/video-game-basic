const CATALOG_ADMIN_KEY = "gamevault:admin";

// Control solo de interfaz: cualquiera puede fijar la clave desde la consola.
// Debe complementarse con autenticación real antes de un uso productivo.
export function hasCatalogAdminAccess() {
  try {
    return window.sessionStorage.getItem(CATALOG_ADMIN_KEY) === "true";
  } catch {
    return false;
  }
}
