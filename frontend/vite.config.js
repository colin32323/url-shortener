import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use 3030 for dev server if PORT is set, else fallback
export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    },
});
