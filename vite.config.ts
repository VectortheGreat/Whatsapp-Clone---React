import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  plugins: [react()],
});
