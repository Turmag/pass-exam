<template>
    <div class="answers">
        <div class="answers__question">
            <div class="answers__question-block">
                {{ store.currentQuestion.question }}
            </div>
        </div>
        <div class="answer-wrapper">
            <div class="answer__decor"></div>
            <div class="answer__inner">
                <div class="answer" :class="answer1Class" @click="chooseAnswer(1)">
                    <div class="answer__dot"></div>
                    A:
                    <div class="answer__value">{{ answer1 }}</div>
                </div>
            </div>
            <div class="answer__inner answer__inner--second">
                <div class="answer" :class="answer2Class" @click="chooseAnswer(2)">
                    <div class="answer__dot"></div>
                    B:
                    <div class="answer__value">{{ answer2 }}</div>
                </div>
            </div>
        </div>
        <div class="answer-wrapper">
            <div class="answer__decor"></div>
            <div class="answer__inner">
                <div class="answer" :class="answer3Class" @click="chooseAnswer(3)">
                    <div class="answer__dot"></div>
                    C:
                    <div class="answer__value">{{ answer3 }}</div>
                </div>
            </div>
            <div class="answer__inner answer__inner--second">
                <div class="answer" :class="answer4Class" @click="chooseAnswer(4)">
                    <div class="answer__dot"></div>
                    D:
                    <div class="answer__value">{{ answer4 }}</div>
                </div>
            </div>
        </div>
        <Transition name="fade">
            <div v-if="store.isHelpTryActive" class="try-wrapper">
                <div class="try">
                    <div class="try__name">x</div>
                    <div class="try__value">2</div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue-demi';
    import { mainStore } from '../../store/main';
    import { modalStore } from '../../store/modal';

    const store = mainStore();
    const storeModal = modalStore();
    let rightAnswer = ref(0);

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
        'answer--chosen': store.chosenAnswer === numb,
        'answer--right': rightAnswer.value === numb,
        'answer--disabled':
            store.chosenAnswer > 0 ||
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

                        store.$patch({
                            currentQuestionNum: store.currentQuestionNum + 1,
                        });

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

            store.$patch({
                isGameEnded,
            });
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

<style lang="scss" scoped>
    .answers {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: calc(100% - 270px);

        &__question {
            display: flex;
            justify-content: center;
            width: 1000px;
            height: 84px;
            background-image: url(../../assets/img/gameComplect.png);
            background-position-y: -462px;
            font-size: 18px;
            color: #fff;
            text-align: center;
        }

        &__question-block {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 600px;
            height: 100%;
            text-align: center;
        }
    }

    .answer-wrapper {
        position: relative;
        display: flex;
        width: 1000px;
    }

    .answer {
        display: flex;
        gap: 8px;
        width: 337px;
        height: 39px;
        padding: 7px 0 0 35px;
        background-image: url(../../assets/img/gameComplect.png);
        background-position: -637px -2px;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;

        &:hover:not(.answer--disabled),
        &--chosen {
            background-position-y: -41px;
            color: #000;
        }

        &--right {
            background-position-y: -80px;
            color: #000;
        }

        &--disabled {
            cursor: default;
        }

        &__decor {
            position: absolute;
            background-image: url(../../assets/img/gameComplect.png);
            background-position-y: -451px;
            margin-top: 26px;
            height: 10px;
            width: 1000px;
        }

        &__inner {
            position: relative;
            font-size: 18px;
            color: #fff;
            margin: 12px 0 0 145px;

            &--second {
                margin-left: 40px;
            }
        }

        &__dot {
            position: absolute;
            top: 17px;
            left: 22px;
            width: 5px;
            height: 5px;
            background-color: #e1a02e;
            border-radius: 50%;
        }

        &:hover:not(.answer--disabled) &__dot,
        &--chosen &__dot {
            background-color: #fff;
        }

        &__value {
            font-size: 15px;
        }
    }

    .try-wrapper {
        position: relative;
        width: 0;
        left: 0;
        height: 0;
    }

    .try {
        position: absolute;
        top: -29px;
        left: -539px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 80px;
        height: 55px;
        font-size: 20px;
        border: 2px solid;
        border-radius: 50%;
        background: black;
        cursor: default;
        user-select: none;
        box-sizing: border-box;

        &__name {
            position: relative;
        }

        &__value {
            font-size: 24pt;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
