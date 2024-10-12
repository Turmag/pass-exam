<template>
    <Transition name="slide-fade">
        <div v-if="store.isDisplayGameField" :class="$style.game">
            <div :class="$style.title">
                <div :class="$style.titleName">
                    Выбранная тематика:
                </div>
                <div :class="$style.titleThematics">
                    {{ currentThematic }}
                </div>
            </div>
            <Help />
            <div :class="$style.main">
                <img :src="mainImg">
            </div>
            <Aside />
            <Answers />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';
import Help from '@/components/game/Help.vue';
import Aside from '@/components/game/Aside.vue';
import Answers from '@/components/game/Answers.vue';
import { mainStore } from '@/store/main';

const store = mainStore();
const mainImg = new URL('/src/assets/img/mainPicture.svg', import.meta.url).href;

watch(
    () => store.isGameStarted,
    value => {
        setTimeout(
            () =>
                store.isDisplayGameField = value,
            700,
        );
    },
);

const currentThematic = computed(() => store.thematics.find(el => el.id === store.chosenThematicId)?.name);
</script>

<style lang="scss" module>
    .game {
        display: flex;
        flex-wrap: wrap;
        min-height: calc(100vh - 90px);
        padding: 20px 8px 0;
    }

    .title {
        display: flex;
        gap: 8px;
        font-size: 18px;
    }

    .titleThematics {
        font-weight: 700;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 270px);
        height: 490px;

        & img {
            width: 472px;
            height: 472px;
        }
    }
</style>

<style lang="scss" scoped>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s ease;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }
</style>
