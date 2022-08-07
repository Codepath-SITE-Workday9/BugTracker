import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig((envConfig) => ({
  plugins: [react()],
  server: {
    open: true,
    host: true,
  },
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: "@material-ui/icons/esm/$1",
      },
      {
        find: /^@material-ui\/core\/(.+)/,
        replacement: "@material-ui/core/es/$1",
      },
      {
        find: /^@material-ui\/core$/,
        replacement: "@material-ui/core/es",
      },
      {
        find: /^@material-ui\/pickers$/,
        replacement: "@material-ui/pickers/esm",
      }
    ],
  },
  define: {
    //global: "window", // fix for packages that support both node and browser
  },
}))