<template>
    <vue-final-modal
        v-model="store.isShowModalRules"
        :classes="$style.modal"
        :content-class="$style.content"
    >
        <div :class="$style.close" @click="closeModal">
            <MdiClose color="#fff" width="20" height="20" />
        </div>
        <div :class="$style.inner">
            <div :class="$style.title">
                Информация об игре
            </div>
            <div :class="$style.text">
                Эта практически плагиат игры «Кто хочет стать миллионером». Впрочем, здесь всё
                немного по-другому.
            </div>
            <div :class="[$style.text, $style.mt]">
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
        padding: 20px 16px 16px;
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

    .title {
        margin-bottom: 20px;
        text-align: center;
        font-size: 20px;
        color: #ffda2f;
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

    .mt {
        margin-top: 20px;
    }
</style>
