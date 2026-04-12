import path from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
    plugins: [vue(), Components({ resolvers: [IconsResolver({ prefix: '' })] }), Icons({ autoInstall: true })],
    base: '/pass-exam/',
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
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
        modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' },
        preprocessorOptions: { scss: { api: 'modern-compiler' } },
    },
}));
