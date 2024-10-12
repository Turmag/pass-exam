import { defineStore } from 'pinia';
import { getRandom } from '@/shared/helpers';
import type { IThematic, IQuestion } from '@/shared/types';
import Api from '@/shared/api';

export const mainStore = defineStore('main', {
    state: () => {
        return {
            audio: {} as HTMLAudioElement,
            thematics: [] as IThematic[],
            chosenThematicId: 0,
            isMuted: true,
            currentQuestionNum: 1,
            currentQuestion: {} as IQuestion,
            isGameStarted: false,
            isGameEnded: false,
            isDisplayGameField: false,
            isAnswerAcepted: false,
            chosenAnswer: 0,
            lowQuestions: [] as IQuestion[],
            middleQuestions: [] as IQuestion[],
            highQuestions: [] as IQuestion[],
            isFiftyUsed: false,
            helpFiftyFiftyNumbers: [] as number[],
            isTryUsed: false,
            isHelpTryActive: false,
            helpTryNumber: 0,
        };
    },
    getters: { chosenThematic: state => state.thematics.find(el => el.id === state.chosenThematicId)as IThematic },
    actions: {
        async getThematics() {
            try {
                const { data: thematics } = await Api.getThematics();
                this.thematics = thematics;
            } catch(error) {
                console.error('error', error);
            }
        },

        async getThematicQuestions(id: number) {
            try {
                const { data: questions } = await Api.getThematicQuestions(id);

                this.addQuestionToThematic({
                    id,
                    questions, 
                });
            } catch(error) {
                console.error('error', error);
            }
        },

        async toggleMute() {
            this.isMuted = !this.isMuted;
            if (!this.audio.ended) {
                this.isMuted ? this.audio.pause() : await this.audio.play();
            }
        },

        addQuestionToThematic({ id, questions }: { id: number; questions: IQuestion[] }) {
            this.thematics.forEach((el, i) => {
                if (el.id === id) this.thematics[i].questions = questions;
            });
        },

        async resetGame() {
            this.currentQuestionNum = 1;
            this.isFiftyUsed = false;
            this.isTryUsed = false;
            this.isGameEnded = false;
            this.audio.src = 'audio/questionMusicLowQuestions.mp3';
            if (!this.isMuted) {
                await this.audio.play();
            }
        },

        resetQuestion() {
            this.helpFiftyFiftyNumbers = [];
            this.isHelpTryActive = false;
            this.helpTryNumber = 0;
            this.isAnswerAcepted = false;
            this.chosenAnswer = 0;
        },

        setQuestions(questions: IQuestion[]) {
            this.lowQuestions = [];
            this.middleQuestions = [];
            this.highQuestions = [];
            questions.forEach(el => {
                switch (Number(el.difficulty)) {
                    case 0: {
                        this.lowQuestions.push(el);
                        break;
                    }
                    case 1: {
                        this.middleQuestions.push(el);
                        break;
                    }
                    case 2: {
                        this.highQuestions.push(el);
                        break;
                    }
                }
            });
        },

        setQuestion() {
            this.resetQuestion();
            let questions = this.lowQuestions;
            if (this.currentQuestionNum > 5 && this.currentQuestionNum < 11) {
                questions = this.middleQuestions;
            } else if (this.currentQuestionNum > 10) {
                questions = this.highQuestions;
            }
            const rand = getRandom(0, questions.length - 1);
            this.currentQuestion = questions[rand];
            questions.splice(rand, 1);
        },
    },
});
