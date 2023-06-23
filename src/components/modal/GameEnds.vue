<template>
    <vue-final-modal
        v-model="store.isShowModalGameEnds"
        classes="modal"
        content-class="modal__content"
    >
        <div class="modal__close" @click="closeModal">
            <IconClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div v-if="store.gameEndsStatus === 0" class="modal__content-text">
                Вы <span class="modal__content-text--error">не сдали</span> экзамен!
            </div>
            <div v-else-if="store.gameEndsStatus === 1" class="modal__content-text">
                Вы сдали экзамен на <span class="modal__content-text--satisfactory">троечку</span>
            </div>
            <div v-else-if="store.gameEndsStatus === 2" class="modal__content-text">
                Вы сдали экзамен <span class="modal__content-text--good">хорошо</span>
            </div>
            <div v-else class="modal__content-text">
                Вы сдали экзамен на <span class="modal__content-text--excellent">отлично</span>!
            </div>
            <div class="modal__content-text modal__content-text--mt">
                Хотите попытаться ещё раз?
            </div>
            <div class="modal__content-btns">
                <div class="modal__content-btn" @click="tryAgain">Да</div>
                <div class="modal__content-btn" @click="closeModal">Нет</div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup>
    import IconClose from '~icons/mdi/close';
    import { modalStore } from '../../store/modal';
    import { mainStore } from '../../store/main';

    const store = modalStore();
    const storeMain = mainStore();

    const closeModal = () => {
        store.$patch({
            isShowModalGameEnds: false,
        });
    };

    const tryAgain = () => {
        storeMain.resetGame();
        storeMain.setQuestions(storeMain.chosenThematic.questions);
        storeMain.setQuestion();
        closeModal();
    };
</script>

<style lang="scss">
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;

        &__content {
            position: relative;
            width: 550px;
            min-height: 100px;
            max-height: 680px;
            padding: 60px 16px 16px 16px;
            overflow: hidden;
            background-color: $gray-modal;
            color: $white;
            border-radius: 20px;
            box-shadow: 0 4px 32px rgb(0 0 0 / 10%);
        }
    }
</style>

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
            font-size: 25px;
            font-weight: bold;
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
            font-size: 18px;
            text-align: center;

            &--mt {
                margin-top: 10px;
            }

            &--error {
                font-weight: 700;
                color: rgb(228, 80, 80);
            }

            &--satisfactory {
                font-weight: 700;
                color: rgb(240, 153, 96);
            }

            &--good {
                font-weight: 700;
                color: rgb(248, 220, 94);
            }

            &--excellent {
                font-weight: 700;
                color: rgb(44, 241, 37);
            }
        }

        &__content-btns {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }

        &__content-btn {
            padding: 10px 15px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            transition: 0.3s ease;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }

            &:active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
