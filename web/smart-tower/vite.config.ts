import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["three"], // ✅ ensures THREE isn't tree-shaken away
  },
  build: {
    commonjsOptions: {
      include: [/three/, /vanta/], // ✅ ensures Vanta can access THREE
    },
  },
});
