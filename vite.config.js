import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { defineViewerConfig } from '@metanull/viewer-core/vite'

const viewerConfig = defineViewerConfig({ dataPackage: '@metanull/the-use-of-colours-in-art-data', plugins: [vue()] })

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  // GitHub Pages serves the site under /<repo>/; the deploy workflow sets
  // BASE_PATH accordingly. Local dev and root deployments use /.
  ...viewerConfig,
})
