<template>
    <vue-final-modal
        v-model="store.isShowModalThematics"
        classes="modal"
        content-class="modal__content"
    >
        <div class="modal__close" @click="closeModal">
            <MdiClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__content-text">
                Вы действительно хотите вернуться к тематикам?
            </div>
            <div class="modal__content-btns">
                <div class="modal__content-btn" @click="thematicsReturn">
                    Да
                </div>
                <div class="modal__content-btn" @click="closeModal">
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
            chosenThematicId: 0,
        });
    }, 800);
    closeModal();
};
</script>

<style lang="scss" scoped>
    .modal {
        &__close {
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

        &__title {
            text-align: center;
            font-size: 25px;
            font-weight: bold;
        }

        &__content-inner {
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

        &__content-text {
            text-align: center;
        }

        &__content-btns {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }

        &__content-btn {
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
    }
</style>
