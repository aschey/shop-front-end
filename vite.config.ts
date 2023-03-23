import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],

    server: {
      port: parseInt(process.env.VITE_PORT || "3000"),
      proxy: {
        "/api": {
          target: `${process.env.VITE_BACKEND_URL}`,
          changeOrigin: true,
          // host: "0.0.0.0",
        },
      },
    },
  });
};
