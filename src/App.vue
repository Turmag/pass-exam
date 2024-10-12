<template>
    <div :class="$style.layout">
        <div :class="$style.layoutInner">
            <Header />
            <Thematics />
            <Game />
        </div>
        <Footer />
    </div>
    
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

const store = mainStore();

const init = () => {
    store.getThematics();
    store.audio = new Audio();
    store.audio.src = 'audio/startBackgroundMusic.mp3';
};

init();
</script>

<style lang="scss" module>
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100vh;
    }

    .layoutInner {
        display: flex;
        flex-direction: column;
    }
</style>
