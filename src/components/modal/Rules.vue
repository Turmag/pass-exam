<template>
    <vue-final-modal
        v-model="store.isShowModalRules"
        classes="modal"
        content-class="modal__content"
    >
        <div class="modal__close" @click="closeModal">
            <MdiClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__title">
                Информация об игре
            </div>
            <div class="modal__content-text">
                Эта практически плагиат игры «Кто хочет стать миллионером». Впрочем, здесь всё
                немного по-другому.
            </div>
            <div class="modal__content-text modal__content-text--mt">
                Можно узнать, насколько хорошо Вы знаете ту или иную тематику.
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import { modalStore } from '@/store/modal';

const store = modalStore();
const closeModal = () => store.isShowModalRules = false;
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
            margin-bottom: 20px;
            text-align: center;
            font-size: 20px;
            color: #ffda2f;
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
            &--mt {
                margin-top: 20px;
            }
        }
    }
</style>
