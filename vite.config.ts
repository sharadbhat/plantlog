import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PlantLog",
        short_name: "PlantLog",
        description: "Plant care logger",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/plant_64_blank.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/plant_512_blank.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/plant_512_blank.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  base: "/plantlog/",
});
