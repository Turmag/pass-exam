<template>
    <footer :class="footerClass">
        <div class="info">Играем!</div>
        <div
            class="mute"
            @click="store.toggleMute"
            :title="store.isMuted ? 'Включить фоновую музыку' : 'Отключить фоновую музыку'"
        >
            <component :is="volume" color="#999" width="20" height="20"></component>
        </div>
    </footer>
</template>

<script setup>
    import VolumeUp from '~icons/carbon/VolumeUp';
    import VolumeMute from '~icons/carbon/VolumeMuteFilled';
    import { ref, markRaw, watch, computed } from 'vue';
    import { mainStore } from '../store/main';
    const store = mainStore();

    const volume = ref(null);
    volume.value = markRaw(VolumeMute);

    let audioInterval = null;

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
        }
    );

    let isFixedFooter = ref(true);

    watch(
        () => store.isDisplayGameField,
        val => {
            setTimeout(() => (isFixedFooter.value = !val), 200);
        }
    );

    const footerClass = computed(() => ({
        'footer--fixed': isFixedFooter.value,
    }));
</script>

<style lang="scss" scoped>
    footer {
        position: relative;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        margin-top: 50px;
        background-color: $black;
        border-top: 1px solid #e3e7ec;
        transition: 0.3s ease;

        &.footer--fixed {
            position: fixed;
        }
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
        cursor: pointer;
        user-select: none;
        border-radius: 20px;
        border: 2px solid #999;
        transition: 0.3s ease;

        &:hover {
            filter: brightness(1.5);
        }
    }
</style>
