import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // works for Render root deployment
  server: {
    port: process.env.PORT,
    host: true
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: ["platform-aware-codedebugger-ai-3.onrender.com"]
  }
});
