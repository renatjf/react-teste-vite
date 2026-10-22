import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.js"],
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Importa variáveis globais em todos os arquivos SCSS
        additionalData: `@use "/src/utils/_mixins.scss" as *;`,
        // Para Sass moderno (recomendado)
        api: "modern-compiler",
      },
    },
  },
});
