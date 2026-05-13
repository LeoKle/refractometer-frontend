import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: resolve(__dirname),
    build: {
        minify: true,
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    server: {
        open: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        }
    },
    define: {
        'process.env': JSON.stringify(process.env)
    }
});