<template>
    <vue-final-modal
        v-model="store.isShowModalThematics"
        :classes="$style.modal"
        :content-class="$style.content"
    >
        <div :class="$style.close" @click="closeModal">
            <MdiClose color="#fff" width="20" height="20" />
        </div>
        <div :class="$style.inner">
            <div :class="$style.text">
                Вы действительно хотите вернуться к тематикам?
            </div>
            <div :class="$style.btns">
                <div :class="$style.btn" @click="thematicsReturn">
                    Да
                </div>
                <div :class="$style.btn" @click="closeModal">
                    Нет
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import { modalStore } from '@/store/modal';
import { mainStore } from '@/store/main';

const store = modalStore();
const storeMain = mainStore();

const closeModal = () => {
    store.isShowModalThematics = false;
};

const thematicsReturn = () => {
    storeMain.isDisplayGameField = false;

    setTimeout(() => {
        storeMain.$patch({
            isGameStarted: false,
            chosenThematicId: '0',
        });
    }, 800);
    closeModal();
};
</script>

<style lang="scss" module>
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        position: relative;
        overflow: hidden;
        width: 550px;
        min-height: 100px;
        max-height: 680px;
        padding: 60px 16px 16px;
        border-radius: 20px;
        background-color: $gray-modal;
        color: $white;
        box-shadow: 0 4px 32px rgb(0 0 0 / 10%);
    }

    .close {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $gray-modal-inner;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: $gray-modal-inner-lighten;
        }

        &:active {
            background-color: $gray-modal-inner-darken;
        }
    }

    .inner {
        overflow: auto;
        height: 100%;
        max-height: 670px;
        padding-right: 16px;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background: #fff;
        }

        &::-webkit-scrollbar-track {
            border-radius: 8px;
            background: $gray-modal-inner;
        }
    }

    .text {
        text-align: center;
    }

    .btns {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 20px;
    }

    .btn {
        padding: 10px 15px;
        border-radius: 15px;
        background-color: rgb(255 255 255 / 20%);
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: rgb(255 255 255 / 40%);
        }

        &:active {
            background-color: rgb(255 255 255 / 10%);
        }
    }
</style>
