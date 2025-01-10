import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  console.log(mode);  
  const isProd = mode === "production"
  const baseURL =
    isProd
      ? import.meta.env.VITE_API_BASE_URL
      : "http://localhost:3000";
  console.log(baseURL);
  

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/": {
          target: baseURL,
          changeOrigin: !isProd,
          secure: isProd,
        }
      },
    },
  }
});
