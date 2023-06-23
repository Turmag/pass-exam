<template>
    <Transition name="slide-fade">
        <div class="game" v-if="store.isDisplayGameField">
            <div class="game__title">
                <div class="game__title-name">Выбранная тематика:</div>
                <div class="game__title-thematics">{{ currentThematic }}</div>
            </div>
            <Help />
            <div class="game__main">
                <img :src="mainImg" />
            </div>
            <Aside />
            <Answers />
        </div>
    </Transition>
</template>

<script setup>
    import Help from './Help.vue';
    import Aside from './Aside.vue';
    import Answers from './Answers.vue';
    import { watch, computed } from 'vue';
    import { mainStore } from '../../store/main';

    const mainImg = new URL(`/src/assets/img/mainPicture.svg`, import.meta.url).href;

    const store = mainStore();

    watch(
        () => store.isGameStarted,
        val => {
            setTimeout(
                () =>
                    store.$patch({
                        isDisplayGameField: val,
                    }),
                700
            );
        }
    );

    const currentThematic = computed(() => {
        return store.thematics.find(el => el.id === store.chosenThematicId)?.name;
    });
</script>

<style lang="scss" scoped>
    .game {
        display: flex;
        flex-wrap: wrap;
        min-height: calc(100vh - 90px);
        padding: 20px 8px 0;

        &__title {
            display: flex;
            gap: 8px;
            font-size: 18px;
        }

        &__title-thematics {
            font-weight: 700;
        }

        &__main {
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
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s ease;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(100px);
        opacity: 0;
    }
</style>
