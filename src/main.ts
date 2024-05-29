import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/style.scss';
const pinia = createPinia();
import { vfmPlugin } from 'vue-final-modal';
import App from '@/App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
app.use(vfmPlugin);
app.use(pinia);
app.mount('#app');
