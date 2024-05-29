<template>
    <footer :class="footerClass">
        <div :class="$style.info">
            Играем!
        </div>
        <div
            :class="$style.mute"
            :title="store.isMuted ? 'Включить фоновую музыку' : 'Отключить фоновую музыку'"
            @click="store.toggleMute"
        >
            <component
                :is="volume"
                color="#999"
                width="20"
                height="20"
            />
        </div>
    </footer>
</template>

<script setup lang="ts">
import VolumeUp from '~icons/carbon/VolumeUp';
import VolumeMute from '~icons/carbon/VolumeMuteFilled';
import {
    ref,
    markRaw,
    watch,
    computed, 
    useCssModule,
} from 'vue';
import { mainStore } from '@/store/main';

const store = mainStore();
const $style = useCssModule();

const volume = ref(null);
volume.value = markRaw(VolumeMute);

let audioInterval: ReturnType<typeof setTimeout>;

const footerClass = computed(() => ({
    [$style.footer]: true,
    [$style.footerFixed]: isFixedFooter.value, 
}));

watch(
    () => store.isMuted,
    val => {
        volume.value = markRaw(val ? VolumeMute : VolumeUp);
        const possibleIncludesPaths = [
            'startGame',
            'rightAnswer',
            'rightAnswerLowQuestions',
            'wrongAnswer',
            'fiftyFifty',
            'oneMoreAttempt',
        ];
        let isIncludesPath = false;
        possibleIncludesPaths.forEach(el => {
            if (store.audio.src.includes(el)) {
                isIncludesPath = true;
            }
        });
        if (isIncludesPath) {
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
        if (val) {
            clearInterval(audioInterval);
        }
    },
);

const isFixedFooter = ref(true);

watch(
    () => store.isDisplayGameField,
    value => {
        setTimeout(() => isFixedFooter.value = !value, 200);
    },
);
</script>

<style lang="scss" module>
    .footer {
        position: relative;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        margin-top: 50px;
        border-top: 1px solid #e3e7ec;
        background-color: $black;
        transition: 0.3s ease;
    }

    .footerFixed {
        position: fixed;
    }

    .info {
        font-size: 18px;
    }

    .mute {
        position: absolute;
        top: 8px;
        right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        border: 2px solid #999;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            filter: brightness(1.5);
        }
    }
</style>
