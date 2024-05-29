<template>
    <div class="help">
        <div class="help__inner">
            <div
                class="help__item help__item--fifty"
                :class="fiftyClass"
                @click="setFiftyHelp"
            />
            <div class="help__item help__item--try" :class="tryClass" @click="setTryHelp" />
        </div>
    </div>
</template>

<script setup>
import { getRandom } from '@/assets/js/helpers';
import { computed } from 'vue';
import { mainStore } from '@/store/main';

const store = mainStore();

const fiftyClass = computed(() => ({
    'help__item--used': store.isFiftyUsed,
    'help__item--disabled': store.isAnswerAcepted || store.isGameEnded,
}));

const tryClass = computed(() => ({
    'help__item--used': store.isTryUsed,
    'help__item--disabled': store.isAnswerAcepted || store.isGameEnded,
}));

const setFiftyHelp = () => {
    if (!store.isFiftyUsed && !store.isAnswerAcepted && !store.isGameEnded) {
        const numbers = [1, 2, 3, 4];
        numbers.splice(numbers.indexOf(Number(store.currentQuestion.rightAnswer)), 1);
        numbers.splice(numbers.indexOf(Number(store.helpTryNumber)), 1);
        let index = getRandom(0, numbers.length - 1);
        const firstNumber = numbers[index];
        numbers.splice(index, 1);
        index = getRandom(0, numbers.length - 1);
        const secondNumber = numbers[index];

        store.$patch({
            helpFiftyFiftyNumbers: [firstNumber, secondNumber],
            isFiftyUsed: true,
        });
        store.audio.src = 'audio/fiftyFifty.mp3';
        store.audio.play();

        continueBackgroundMusic();
    }
};

const setTryHelp = () => {
    if (!store.isTryUsed && !store.isAnswerAcepted && !store.isGameEnded) {
        store.$patch({
            isTryUsed: true,
            isHelpTryActive: true,
        });

        store.audio.src = 'audio/oneMoreAttempt.mp3';
        store.audio.play();

        continueBackgroundMusic();
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
</script>

<style lang="scss" scoped>
    .help {
        display: flex;
        width: 100%;
        margin-bottom: 20px;

        &__inner {
            display: flex;
            justify-content: center;
            width: calc(100% - 270px);
        }

        &__item {
            width: 80px;
            height: 60px;
            background-image: url("../../assets/img/gameComplect.png");
            background-repeat: no-repeat;
            cursor: pointer;
            background-position-x: -450px;
            user-select: none;

            &--hall {
                background-position-y: 1px;
            }

            &--fifty {
                background-position-y: -59px;
            }

            &--call {
                background-position-y: -119px;
            }

            &--try {
                background-position-y: -178px;
            }

            &--used {
                opacity: 0.5;
                cursor: default;
            }

            &--disabled {
                cursor: default;
            }

            &:hover:not(.help__item--used, .help__item--disabled) {
                background-position-x: -530px;
            }
        }
    }
</style>
