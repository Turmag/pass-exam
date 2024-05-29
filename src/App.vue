<template>
    <Header />
    <Thematics />
    <Game />
    <Footer />
    <ModalThematicsBack />
    <ModalRules />
    <ModalGameEnds />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Thematics from '@/components/thematics/Index.vue';
import Game from '@/components/game/Index.vue';
import Footer from '@/components/Footer.vue';
import ModalThematicsBack from '@/components/modal/ThematicsBack.vue';
import ModalGameEnds from '@/components/modal/GameEnds.vue';
import ModalRules from '@/components/modal/Rules.vue';
import { mainStore } from '@/store/main';
import { onMounted } from 'vue';

const store = mainStore();
onMounted(() => {
    store.getThematics();
    store.audio = new Audio();
    store.audio.src = 'audio/startBackgroundMusic.mp3';
});
</script>
