import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [react(), TanStackRouterVite()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.SOCKET_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      middlewareMode: env.NODE_ENV === "development" ? false : true,
    },
    publicDir: "public",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@widgets": path.resolve(__dirname, "./src/widgets"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@app": path.resolve(__dirname, "./src/app"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    define: {
      __SOCKET_URL__: JSON.stringify(env.SOCKET_URL),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    build: {
      target: "esnext",
      sourcemap: true,
      modulePreload: {
        polyfill: true,
      },
      chunkSizeWarningLimit: 1000,
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
        },
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name || "unknown";
            const extType = fileName.split(".").pop()?.toLowerCase() || "";

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`;
            }

            if (/woff2?|ttf|eot|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }

            return `assets/[name]-[hash][extname]`;
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@tanstack/router"],
    },
  };
});
