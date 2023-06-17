import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    federation({
      name: "app",
      remotes: {
        remoteApp: "http://127.0.0.1:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-katex"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
