import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes (SPA).
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // HMR is disabled: Bun 1.3.x's HMR transform emits references to CSS Module
    // imports (`import_*_module`) without declaring them, which throws
    // `ReferenceError: import_*_module is not defined` at runtime. With HMR off,
    // CSS Modules bundle correctly and the dev server still re-bundles on each
    // request, so edits appear on refresh.
    hmr: false,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 AnimeVault running at ${server.url}`);
