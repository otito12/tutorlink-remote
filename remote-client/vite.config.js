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
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./ab5c7957-76ed-4403-8fc0-ddb62a8dfd24":
          "./src/questions/ab5c7957-76ed-4403-8fc0-ddb62a8dfd24",
      },
      shared: ["react", "react-dom", "react-katex", "react-mathquill"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
