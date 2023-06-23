<template>
    <header>
        <div class="logo">
            <img :src="logoImg" />
        </div>
        <div class="name">
            <div class="name__text">Кто хочет сдать экзамен?</div>
            <IconQuestion class="name__icon" width="25" height="25" @click="openModalRules" />
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

<script setup>
    import IconClose from '~icons/mdi/close';
    import IconQuestion from '~icons/carbon/help';
    import { modalStore } from '../store/modal';
    import { mainStore } from '../store/main';

    const store = modalStore();
    const storeMain = mainStore();

    const logoImg = new URL(`/src/assets/img/logo.png`, import.meta.url).href;

    const openModalRules = () => {
        store.$patch({
            isShowModalRules: true,
        });
    };

    const openModalThematics = () => {
        store.$patch({
            isShowModalThematics: true,
        });
    };
</script>

<style lang="scss" scoped>
    header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $black;
        border-bottom: 1px solid #e3e7ec;
        font-size: 20px;
        height: 80px;
        z-index: 1;
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
            top: 27px;
            left: -120px;
            position: absolute;
            font-size: 16px;
            cursor: pointer;
            user-select: none;

            &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 2px;
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
