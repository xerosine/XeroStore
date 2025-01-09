import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const baseURL = import.meta.env.NODE_ENV === "production" ? "https://xerostore-backend.onrender.com" : "http://localhost:3000"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": baseURL,
    },
  },
});
