<template>
    <header>
        <div class="logo">
            <img :src="logoImg">
        </div>
        <div class="name">
            <div class="name__text">
                Кто хочет сдать экзамен?
            </div>
            <CarbonHelp
                class="name__icon"
                width="25"
                height="25"
                @click="openModalRules"
            />
        </div>
        <div class="balance">
            <Transition name="fade">
                <div
                    v-if="storeMain.isDisplayGameField"
                    class="balance__btn"
                    @click="openModalThematics"
                >
                    Вернуться к тематикам
                </div>
            </Transition>
        </div>
    </header>
</template>

<script setup lang="ts">
import { modalStore } from '@/store/modal';
import { mainStore } from '@/store/main';

const store = modalStore();
const storeMain = mainStore();

const logoImg = new URL('/src/assets/img/logo.png', import.meta.url).href;

const openModalRules = () => store.isShowModalRules = true;
const openModalThematics = () => store.isShowModalThematics = true;
</script>

<style lang="scss" scoped>
    header {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        border-bottom: 1px solid #e3e7ec;
        background-color: $black;
        font-size: 20px;
    }

    .logo {
        display: block;
        width: 70px;
        height: 70px;
        padding-left: 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        display: flex;
        gap: 8px;

        &__icon {
            cursor: pointer;
            user-select: none;
        }
    }

    .balance {
        position: relative;
        width: 80px;
        height: 100%;

        &__btn {
            position: absolute;
            top: 27px;
            left: -120px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;

            &::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: #fff;
            }
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
