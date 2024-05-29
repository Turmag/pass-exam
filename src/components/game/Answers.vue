<template>
    <div :class="$style.answers">
        <div :class="$style.answersQuestion">
            <div :class="$style.answersQuestionBlock">
                {{ store.currentQuestion.question }}
            </div>
        </div>
        <div :class="$style.answerWrapper">
            <div :class="$style.answerDecor" />
            <div :class="$style.answerInner">
                <div :class="[$style.answer, answer1Class]" @click="chooseAnswer(1)">
                    <div :class="$style.answerDot" />
                    A:
                    <div :class="$style.answerValue">
                        {{ answer1 }}
                    </div>
                </div>
            </div>
            <div :class="[$style.answerInner, $style.answerInnerSecond]">
                <div :class="[$style.answer, answer2Class]" @click="chooseAnswer(2)">
                    <div :class="$style.answerDot" />
                    B:
                    <div :class="$style.answerValue">
                        {{ answer2 }}
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.answerWrapper">
            <div :class="$style.answerDecor" />
            <div :class="$style.answerInner">
                <div :class="[$style.answer, answer3Class]" @click="chooseAnswer(3)">
                    <div :class="$style.answerDot" />
                    C:
                    <div :class="$style.answerValue">
                        {{ answer3 }}
                    </div>
                </div>
            </div>
            <div :class="[$style.answerInner, $style.answerInnerSecond]">
                <div :class="[$style.answer, answer4Class]" @click="chooseAnswer(4)">
                    <div :class="$style.answerDot" />
                    D:
                    <div :class="$style.answerValue">
                        {{ answer4 }}
                    </div>
                </div>
            </div>
        </div>
        <Transition name="fade">
            <div v-if="store.isHelpTryActive" :class="$style.tryWrapper">
                <div :class="$style.try">
                    <div :class="$style.tryName">
                        x
                    </div>
                    <div :class="$style.tryValue">
                        2
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import {
    ref, computed, useCssModule, 
} from 'vue';
import { mainStore } from '@/store/main';
import { modalStore } from '@/store/modal';

const store = mainStore();
const storeModal = modalStore();
const $style = useCssModule();

const rightAnswer = ref(0);

const answer1 = computed(() => {
    return store.helpFiftyFiftyNumbers.includes(1) || store.helpTryNumber === 1
        ? ''
        : store.currentQuestion.answer1;
});
const answer1Class = computed(() => getAnswerClass(1));

const answer2 = computed(() => {
    return store.helpFiftyFiftyNumbers.includes(2) || store.helpTryNumber === 2
        ? ''
        : store.currentQuestion.answer2;
});
const answer2Class = computed(() => getAnswerClass(2));

const answer3 = computed(() => {
    return store.helpFiftyFiftyNumbers.includes(3) || store.helpTryNumber === 3
        ? ''
        : store.currentQuestion.answer3;
});
const answer3Class = computed(() => getAnswerClass(3));

const answer4 = computed(() => {
    return store.helpFiftyFiftyNumbers.includes(4) || store.helpTryNumber === 4
        ? ''
        : store.currentQuestion.answer4;
});
const answer4Class = computed(() => getAnswerClass(4));

const getAnswerClass = numb => ({
    [$style.answerChosen]: store.chosenAnswer === numb,
    [$style.answerRight]: rightAnswer.value === numb,
    [$style.answerDisabled]: store.chosenAnswer > 0 ||
        store.helpFiftyFiftyNumbers.includes(numb) ||
        store.helpTryNumber === numb ||
        store.isGameEnded,
});

const chooseAnswer = questionNumb => {
    if (
        store.chosenAnswer === 0 &&
        !store.helpFiftyFiftyNumbers.includes(questionNumb) &&
        store.helpTryNumber !== questionNumb &&
        !store.isGameEnded
    ) {
        store.$patch({
            isAnswerAcepted: true,
            chosenAnswer: questionNumb,
        });
        store.audio.src = 'audio/answerAccepted.mp3';
        store.audio.play();

        setTimeout(() => {
            if (store.currentQuestion.rightAnswer == store.chosenAnswer) {
                let src = 'audio/rightAnswer.mp3';
                if (store.currentQuestionNum < 6) {
                    src = 'audio/rightAnswerLowQuestions.mp3';
                }
                store.audio.src = src;
                store.audio.play();
                rightAnswer.value = store.chosenAnswer;
                setTimeout(() => {
                    rightAnswer.value = 0;
                }, 200);
                setTimeout(() => {
                    rightAnswer.value = store.chosenAnswer;
                }, 400);
                setTimeout(() => {
                    rightAnswer.value = 0;

                    store.$patch({ currentQuestionNum: store.currentQuestionNum + 1 });

                    store.currentQuestionNum > 15
                        ? showGameEndsModal({ isGameEnded: true })
                        : store.setQuestion();
                }, 2000);

                continueBackgroundMusic();
            } else if (store.isHelpTryActive && store.helpTryNumber === 0) {
                store.audio.src = 'audio/wrongAnswerShort.mp3';
                store.audio.play();
                store.$patch({
                    helpTryNumber: store.chosenAnswer,
                    chosenAnswer: 0,
                    isAnswerAcepted: false,
                });
            } else {
                store.audio.src = 'audio/wrongAnswer.mp3';
                store.audio.play();
                clearInterval(audioInterval);
                showGameEndsModal({ isGameEnded: true });
            }
        }, 3000);
    }
};

let audioInterval = null;
const continueBackgroundMusic = () => {
    if (!store.isMuted) {
        clearInterval(audioInterval);
        audioInterval = setInterval(() => {
            if (store.audio.ended) {
                let src = 'audio/questionMusicOtherQuestions.mp3';
                if (store.currentQuestionNum < 6) {
                    src = 'audio/questionMusicLowQuestions.mp3';
                }
                store.audio.src = src;

                store.audio.play();
            }
        }, 1000);
    }
};

const showGameEndsModal = ({ isGameEnded = false }) => {
    setTimeout(() => {
        store.resetQuestion();

        store.$patch({ isGameEnded });
        storeModal.$patch({
            gameEndsStatus:
                store.currentQuestionNum < 6
                    ? 0
                    : store.currentQuestionNum < 11
                        ? 1
                        : store.currentQuestionNum < 16
                            ? 2
                            : 3,
            isShowModalGameEnds: true,
        });
    }, 200);
};
</script>

<style lang="scss" module>
    .answers {
        position: relative;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: calc(100% - 270px);

        & :global {
            .fade-enter-active,
            .fade-leave-active {
                transition: opacity 0.5s ease;
            }

            .fade-enter-from,
            .fade-leave-to {
                opacity: 0;
            }
        }
    }

    .answersQuestion {
        display: flex;
        justify-content: center;
        width: 1000px;
        height: 84px;
        background-image: url("@/assets/img/gameComplect.png");
        text-align: center;
        font-size: 18px;
        color: #fff;
        background-position-y: -462px;
    }

    .answersQuestionBlock {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 600px;
        height: 100%;
        text-align: center;
    }

    .answerWrapper {
        position: relative;
        display: flex;
        width: 1000px;
    }

    .answer {
        box-sizing: border-box;
        display: flex;
        width: 337px;
        height: 39px;
        padding: 7px 0 0 35px;
        background-image: url("@/assets/img/gameComplect.png");
        background-position: -637px -2px;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
        gap: 8px;
        user-select: none;

        &:hover:not(.answerDisabled),
        &.answerChosen {
            background-position-y: -41px;
            color: #000;
        }

        &.answerRight {
            background-position-y: -80px;
            color: #000;
        }

        &.answerDisabled {
            cursor: default;
        }
    }

    .answerDecor {
        position: absolute;
        width: 1000px;
        height: 10px;
        margin-top: 26px;
        background-image: url("@/assets/img/gameComplect.png");
        background-position-y: -451px;
    }

    .answerInner {
        position: relative;
        margin: 12px 0 0 145px;
        font-size: 18px;
        color: #fff;
    }

    .answerInnerSecond {
        margin-left: 40px;
    }

    .answerDot {
        position: absolute;
        top: 17px;
        left: 22px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #e1a02e;

        .answer:hover:not(.answerDisabled) &,
        .answerChosen & {
            background-color: #fff;
        }
    }

    .answerValue {
        font-size: 15px;
    }

    .tryWrapper {
        position: relative;
        left: 0;
        width: 0;
        height: 0;
    }

    .try {
        position: absolute;
        top: -29px;
        left: -539px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 55px;
        border-radius: 50%;
        border: 2px solid;
        background: black;
        font-size: 20px;
        cursor: default;
        gap: 8px;
        user-select: none;
    }

    .tryName {
        position: relative;
    }

    .tryValue {
        font-size: 24pt;
    }
</style>
