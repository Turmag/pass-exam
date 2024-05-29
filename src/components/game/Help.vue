<template>
    <div :class="$style.help">
        <div :class="$style.inner">
            <div
                :class="[$style.item, $style.itemFifty, fiftyClass]"
                @click="setFiftyHelp"
            />
            <div
                :class="[$style.item, $style.itemTry, tryClass]"
                @click="setTryHelp"
            />
        </div>
    </div>
</template>

<script setup>
import { getRandom } from '@/assets/js/helpers';
import { computed, useCssModule } from 'vue';
import { mainStore } from '@/store/main';

const store = mainStore();
const $style = useCssModule();

const fiftyClass = computed(() => ({
    [$style.item]: true,
    [$style.itemUsed]: store.isFiftyUsed,
    [$style.itemDisabled]: store.isAnswerAcepted || store.isGameEnded,
}));

const tryClass = computed(() => ({
    [$style.item]: true,
    [$style.itemUsed]: store.isTryUsed,
    [$style.itemDisabled]: store.isAnswerAcepted || store.isGameEnded,
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

<style lang="scss" module>
    .help {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
    }

    .inner {
        display: flex;
        justify-content: center;
        width: calc(100% - 270px);
    }

    .item {
        width: 80px;
        height: 60px;
        background-image: url("@/assets/img/gameComplect.png");
        background-repeat: no-repeat;
        cursor: pointer;
        user-select: none;
    }

    .itemHall {
        background-position-x: -450px;
        background-position-y: 1px;
    }

    .itemFifty {
        background-position-x: -450px;
        background-position-y: -59px;
    }

    .itemCall {
        background-position-x: -450px;
        background-position-y: -119px;
    }

    .itemTry {
        background-position-x: -450px;
        background-position-y: -178px;
    }

    .itemUsed {
        opacity: 0.5;
        cursor: default;
    }

    .itemDisabled {
        cursor: default;
    }

    .item:hover:not(.itemUsed, .itemDisabled) {
        background-position-x: -530px;
    }
</style>
