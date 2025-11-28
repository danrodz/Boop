/**
  {
    "api": 1,
    "name": "Webpack Config to Vite",
    "description": "Convert basic Webpack config to Vite config",
    "author": "Boop",
    "icon": "gear",
    "tags": "webpack,vite,config,convert,build"
  }
**/

function main(state) {
  const result = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});`;

  state.text = result;
  state.postInfo("Generated Vite config template");
}
