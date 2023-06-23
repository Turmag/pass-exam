<template>
    <vue-final-modal
        v-model="store.isShowModalThematics"
        classes="modal"
        content-class="modal__content"
    >
        <div class="modal__close" @click="closeModal">
            <IconClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__content-text">Вы действительно хотите вернуться к тематикам?</div>
            <div class="modal__content-btns">
                <div class="modal__content-btn" @click="thematicsReturn">Да</div>
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
            isShowModalThematics: false,
        });
    };

    const thematicsReturn = () => {
        storeMain.$patch({
            isDisplayGameField: false,
        });

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
