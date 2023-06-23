import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Icons()],
    base: '/pass-exam/',
    server: {
        proxy: {
            '/api': {
                target: 'https://focusinfo.ru/pass-exam/api',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import './src/assets/scss/variables.scss';
                `,
            },
        },
    },
});
