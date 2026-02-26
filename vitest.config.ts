import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            'virtual:pwa-register/react': path.resolve(__dirname, 'src/__mocks__/virtual-pwa.ts')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e/*', 'tests/*'],
    },
})
