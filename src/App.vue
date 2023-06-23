<template>
    <Header />
    <Thematics />
    <Game />
    <Footer />
    <ModalThematicsBack />
    <ModalRules />
    <ModalGameEnds />
</template>

<script setup>
    import Header from './components/Header.vue';
    import Thematics from './components/thematics/Index.vue';
    import Game from './components/game/Index.vue';
    import Footer from './components/Footer.vue';
    import ModalThematicsBack from './components/modal/ThematicsBack.vue';
    import ModalGameEnds from './components/modal/GameEnds.vue';
    import ModalRules from './components/modal/Rules.vue';
    import axios from 'redaxios';
    import { mainStore } from './store/main';
    import { onMounted } from 'vue';

    const store = mainStore();
    onMounted(async () => {
        const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
        const { data: thematics } = await axios.get(`${path}/api/getThematics.php`);
        store.$patch({
            thematics,
            audio: new Audio(),
        });

        store.audio.src = 'audio/startBackgroundMusic.mp3';
    });
</script>