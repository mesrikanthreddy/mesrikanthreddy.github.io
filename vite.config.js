import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// IMPORTANT — GitHub Pages base path:
// If this repo deploys to https://<username>.github.io/<repo-name>/ (a normal
// project repo), base MUST be '/<repo-name>/'.
// If this repo IS your root user site (repo literally named
// <username>.github.io), base should stay '/'.
// Deployed as the root user site (repo: mesrikanthreddy.github.io), so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
