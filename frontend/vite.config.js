import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  console.log(mode);  
  const isProd = mode === "production"
  const baseURL =
    isProd
      ? "https://xerostore-backend.onrender.com"
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
