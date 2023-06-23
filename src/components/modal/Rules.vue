<template>
    <vue-final-modal
        v-model="store.isShowModalRules"
        classes="modal"
        content-class="modal__content"
    >
        <div class="modal__close" @click="closeModal">
            <IconClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__title">Информация об игре</div>
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

<script setup>
    import IconClose from '~icons/mdi/close';
    import { modalStore } from '../../store/modal';

    const store = modalStore();

    const closeModal = () => {
        store.$patch({
            isShowModalRules: false,
        });
    };
</script>

<style lang="scss" scoped>
    .modal {
        &__close {
            position: absolute;
            right: 16px;
            top: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background-color: $gray-modal-inner;
            border-radius: 50%;
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
            font-size: 20px;
            color: #ffda2f;
            text-align: center;
        }

        &__content-inner {
            height: 100%;
            max-height: 670px;
            padding-right: 16px;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 8px;
                background: #ffffff;
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
