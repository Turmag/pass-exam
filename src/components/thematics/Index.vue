<template>
    <Transition name="slide-fade">
        <div v-if="!store.isGameStarted && !store.isDisplayGameField" class="thematics">
            <h2>Выберите тематику:</h2>
            <div class="thematics__items-wrapper">
                <Item v-for="(thematic, i) in store.thematics" :key="i" v-bind="thematic" />
            </div>
            <div v-if="store.chosenThematicId !== '0'" class="thematics__btn-wrapper">
                <div class="thematics__btn" @click="startGame">
                    Начать игру
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import Item from '@/components/thematics/Item.vue';
import { mainStore } from '@/store/main';

const store = mainStore();

const startGame = async () => {
    if (!store.chosenThematic.questions?.length) {
        await store.getThematicQuestions(store.chosenThematicId);
    }

    if (store.chosenThematic.questions.length) {
        store.resetGame();
        store.setQuestions(store.chosenThematic.questions);
        store.setQuestion();
        store.$patch({ isGameStarted: true });
        store.audio.src = 'audio/startGame.mp3';
        store.audio.play();

        setTimeout(() => {
            document.querySelector('.game').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    } else {
        console.log('Нельзя начать игру в этой тематике');
    }
};
</script>

<style lang="scss" scoped>
    .thematics {
        padding: 0 8px;

        &__items-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        &__btn-wrapper {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        &__btn {
            position: relative;
            overflow: hidden;
            padding: 25px 80px;
            border: 3px solid #fff;
            outline: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #fff;
            transition: all 0.3s;
            cursor: pointer;
            font-weight: 700;
            user-select: none;

            &:hover {
                color: #181818;

                &::after {
                    height: 260%;
                    opacity: 1;
                }
            }

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: -1;
                box-sizing: border-box;
                width: 100%;
                height: 0;
                background: #fff;
                opacity: 0;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                transition: all 0.3s;
            }

            &:active {
                color: #181818;

                &::after {
                    height: 430%;
                    opacity: 1;
                }
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
        opacity: 0;
        transform: translateY(-100px);
    }
</style>
