<template>
    <Transition name="slide-fade">
        <div class="thematics" v-if="!store.isGameStarted && !store.isDisplayGameField">
            <h2>Выберите тематику:</h2>
            <div class="thematics__items-wrapper">
                <Item v-for="(thematic, i) in store.thematics" :key="i" v-bind="thematic" />
            </div>
            <div v-if="store.chosenThematicId !== 0" class="thematics__btn-wrapper">
                <div class="thematics__btn" @click="startGame">Начать игру</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
    import Item from './Item.vue';
    import axios from 'redaxios';
    import { mainStore } from '../../store/main';

    const store = mainStore();

    const startGame = async () => {
        if (!store.chosenThematic.questions?.length) {
            const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
            const { data: questions } = await axios.post(`${path}/api/getThematicQuestions.php`, {
                thematicId: store.chosenThematicId,
            });
            store.addQuestionToThematic({ id: store.chosenThematicId, questions });
        }
        if (store.chosenThematic.questions.length) {
            store.resetGame();
            store.setQuestions(store.chosenThematic.questions);
            store.setQuestion();
            store.$patch({
                isGameStarted: true,
            });
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
            color: #fff;
            border: 3px solid #fff;
            padding: 25px 80px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            outline: none;
            transition: all 0.3s;
            overflow: hidden;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: #181818;

                &:after {
                    height: 260%;
                    opacity: 1;
                }
            }

            &:after {
                content: '';
                position: absolute;
                z-index: -1;
                width: 100%;
                height: 0;
                top: 50%;
                left: 50%;
                background: #fff;
                opacity: 0;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                box-sizing: border-box;
                transition: all 0.3s;
            }

            &:active {
                color: #181818;
                &:after {
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
        transform: translateY(-100px);
        opacity: 0;
    }
</style>
