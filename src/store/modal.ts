import { defineStore } from 'pinia';

export const modalStore = defineStore('modal', {
    state: () => {
        return {
            isShowModalThematics: false,
            isShowModalRules: false,
            isShowModalGameEnds: false,
            gameEndsStatus: 0,
        };
    },
});
