import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detect if we are deploying to GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/Platform-Aware-CodeDebugger-AI/" : "./",
  
  server: {
    port: process.env.PORT,
    host: true,
    allowedHosts: [
      "8c1836fc-a2c2-44e0-956c-932b34847d84-00-eha6vjd7m0zo.janeway.replit.dev" // Replit host allowed
    ]
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "platform-aware-codedebugger-ai-3.onrender.com",
      "8c1836fc-a2c2-44e0-956c-932b34847d84-00-eha6vjd7m0zo.janeway.replit.dev" // Add here too
    ]
  }
});
