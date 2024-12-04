// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///home/sunub/web14-betting-duck/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import react from "file:///home/sunub/web14-betting-duck/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///home/sunub/web14-betting-duck/node_modules/.pnpm/@tanstack+router-plugin@1.79.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0__webpack@5.96.1/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import tsconfigPaths from "file:///home/sunub/web14-betting-duck/node_modules/.pnpm/vite-tsconfig-paths@5.1.3_typescript@5.6.3_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "/home/sunub/web14-betting-duck/frontend";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "@/src/index.css";`
        }
      }
    },
    assetsInclude: ["**/*.glb", "**/*.hdr"],
    plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
    server: {
      port: 3e3,
      proxy: {
        "/api": {
          target: env.SOCKET_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy) => {
            proxy.on("proxyRes", (proxyRes) => {
              proxyRes.headers["cache-control"] = "public, max-age=31536000";
            });
          }
        }
      },
      middlewareMode: env.NODE_ENV === "development" ? false : true
    },
    publicDir: "public",
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src"),
        "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
        "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
        "@routes": path.resolve(__vite_injected_original_dirname, "./src/routes"),
        "@widgets": path.resolve(__vite_injected_original_dirname, "./src/widgets"),
        "@shared": path.resolve(__vite_injected_original_dirname, "./src/shared"),
        "@app": path.resolve(__vite_injected_original_dirname, "./src/app"),
        "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets")
      }
    },
    define: {
      __SOCKET_URL__: JSON.stringify(env.SOCKET_URL),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV)
    },
    build: {
      target: "esnext",
      sourcemap: true,
      modulePreload: {
        polyfill: true
      },
      chunkSizeWarningLimit: 1e3,
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: path.resolve(__vite_injected_original_dirname, "index.html")
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
            if (/glb|hdr/i.test(extType)) {
              return `assets/models/[name]-[hash][extname]`;
            }
            if (/woff2?|ttf|eot|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("@tanstack")) return "vendor-tanstack";
              if (id.includes("react")) return "vendor-react";
              if (id.includes("@socket")) return "vendor-socket";
              return "vendor";
            }
            if (id.includes("/features/")) {
              const feature = id.split("/features/")[1].split("/")[0];
              return `feature-${feature}`;
            }
          }
        }
      },
      cssCodeSplit: true
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@tanstack/router"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zdW51Yi93ZWIxNC1iZXR0aW5nLWR1Y2svZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3N1bnViL3dlYjE0LWJldHRpbmctZHVjay9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9zdW51Yi93ZWIxNC1iZXR0aW5nLWR1Y2svZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IFRhblN0YWNrUm91dGVyVml0ZSB9IGZyb20gXCJAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuICByZXR1cm4ge1xuICAgIGJhc2U6IFwiL1wiLFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3NyYy9pbmRleC5jc3NcIjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzc2V0c0luY2x1ZGU6IFtcIioqLyouZ2xiXCIsIFwiKiovKi5oZHJcIl0sXG4gICAgcGx1Z2luczogW3JlYWN0KCksIFRhblN0YWNrUm91dGVyVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogMzAwMCxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuU09DS0VUX1VSTCxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmU6IChwcm94eSkgPT4ge1xuICAgICAgICAgICAgcHJveHkub24oXCJwcm94eVJlc1wiLCAocHJveHlSZXMpID0+IHtcbiAgICAgICAgICAgICAgcHJveHlSZXMuaGVhZGVyc1tcImNhY2hlLWNvbnRyb2xcIl0gPSBcInB1YmxpYywgbWF4LWFnZT0zMTUzNjAwMFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtaWRkbGV3YXJlTW9kZTogZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyBmYWxzZSA6IHRydWUsXG4gICAgfSxcbiAgICBwdWJsaWNEaXI6IFwicHVibGljXCIsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzXCIpLFxuICAgICAgICBcIkBwYWdlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3BhZ2VzXCIpLFxuICAgICAgICBcIkByb3V0ZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yb3V0ZXNcIiksXG4gICAgICAgIFwiQHdpZGdldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy93aWRnZXRzXCIpLFxuICAgICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zaGFyZWRcIiksXG4gICAgICAgIFwiQGFwcFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2FwcFwiKSxcbiAgICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXNzZXRzXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgX19TT0NLRVRfVVJMX186IEpTT04uc3RyaW5naWZ5KGVudi5TT0NLRVRfVVJMKSxcbiAgICAgIF9fQVBQX0VOVl9fOiBKU09OLnN0cmluZ2lmeShlbnYuVklURV9BUFBfRU5WKSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICBtb2R1bGVQcmVsb2FkOiB7XG4gICAgICAgIHBvbHlmaWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICAgIGFzc2V0c0RpcjogXCJhc3NldHNcIixcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBtYWluOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBhc3NldEluZm8ubmFtZSB8fCBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGV4dFR5cGUgPSBmaWxlTmFtZS5zcGxpdChcIi5cIikucG9wKCk/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcblxuICAgICAgICAgICAgaWYgKC9wbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28vaS50ZXN0KGV4dFR5cGUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKC9nbGJ8aGRyL2kudGVzdChleHRUeXBlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9tb2RlbHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgvd29mZjI/fHR0Znxlb3R8b3RmL2kudGVzdChleHRUeXBlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9mb250cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXWA7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAdGFuc3RhY2tcIikpIHJldHVybiBcInZlbmRvci10YW5zdGFja1wiO1xuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XG4gICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkBzb2NrZXRcIikpIHJldHVybiBcInZlbmRvci1zb2NrZXRcIjtcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9mZWF0dXJlcy9cIikpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZSA9IGlkLnNwbGl0KFwiL2ZlYXR1cmVzL1wiKVsxXS5zcGxpdChcIi9cIilbMF07XG4gICAgICAgICAgICAgIHJldHVybiBgZmVhdHVyZS0ke2ZlYXR1cmV9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gICAgICBleGNsdWRlOiBbXCJAdGFuc3RhY2svcm91dGVyXCJdLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsT0FBTyxVQUFVO0FBQ3hULFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUNsQixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLG1CQUFtQjtBQUoxQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsS0FBSztBQUFBLFVBQ0gsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZSxDQUFDLFlBQVksVUFBVTtBQUFBLElBQ3RDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDeEQsUUFB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
