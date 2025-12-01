import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detect if we are deploying to GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/Platform-Aware-CodeDebugger-AI/" : "./",
  server: {
    port: process.env.PORT,
    host: true
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: ["platform-aware-codedebugger-ai-3.onrender.com"]
  }
});
