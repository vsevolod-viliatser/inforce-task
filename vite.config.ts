import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT || "3000"),
      open: true,
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version || "1.0.0"),
    },
  };
});
