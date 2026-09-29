import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" — el sitio se publica como page de proyecto (sub-path), rutas relativas
// funcionan igual sin acoplar el build al nombre del repositorio.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
