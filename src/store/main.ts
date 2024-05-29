import { defineStore } from 'pinia';
import { getRandom } from '@/assets/js/helpers';
import { Thematic, Question } from '@/services/types';
import Api from '@/services/api';

export const mainStore = defineStore('main', {
    state: () => {
        return {
            audio: {} as HTMLAudioElement,
            thematics: [] as Thematic[],
            chosenThematicId: '0',
            isMuted: true,
            currentQuestionNum: 1,
            currentQuestion: {} as Question,
            isGameStarted: false,
            isGameEnded: false,
            isDisplayGameField: false,
            isAnswerAcepted: false,
            chosenAnswer: 0,
            lowQuestions: [] as Question[],
            middleQuestions: [] as Question[],
            highQuestions: [] as Question[],
            isFiftyUsed: false,
            helpFiftyFiftyNumbers: [],
            isTryUsed: false,
            isHelpTryActive: false,
            helpTryNumber: 0,
        };
    },
    getters: { chosenThematic: state => state.thematics.find(el => el.id === state.chosenThematicId) },
    actions: {
        async getThematics() {
            try {
                const { data: thematics } = await Api.getThematics();
                this.thematics = thematics;
            } catch(error) {
                console.error('error', error);
            }
        },

        async getThematicQuestions(id: string) {
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

        addQuestionToThematic({ id, questions }: { id: string; questions: string }) {
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

        setQuestions(questions: Question[]) {
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
