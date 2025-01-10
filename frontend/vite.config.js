import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const baseURL = process.env.NODE_ENV === "production" ? "https://xerostore-backend.onrender.com" : "http://localhost:3000"
console.log(baseURL);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": baseURL,
    },
  },
});
