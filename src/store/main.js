import { defineStore } from 'pinia';
import { getRandom } from '../helpers/functions';

export const mainStore = defineStore('main', {
    state: () => {
        return {
            audio: {},
            thematics: [],
            chosenThematicId: 0,
            isMuted: true,
            currentQuestionNum: 1,
            currentQuestion: {},
            isGameStarted: false,
            isGameEnded: false,
            isDisplayGameField: false,
            isAnswerAcepted: false,
            chosenAnswer: 0,
            lowQuestions: [],
            middleQuestions: [],
            highQuestions: [],
            isFiftyUsed: false,
            helpFiftyFiftyNumbers: [],
            isTryUsed: false,
            isHelpTryActive: false,
            helpTryNumber: 0,
        };
    },
    getters: {
        chosenThematic: state => state.thematics.find(el => el.id === state.chosenThematicId),
    },
    actions: {
        toggleMute() {
            this.isMuted = !this.isMuted;
            if (!this.audio.ended) {
                this.isMuted ? this.audio.pause() : this.audio.play();
            }
        },
        addQuestionToThematic({ id, questions }) {
            this.thematics.forEach((el, i) => {
                if (el.id === id) {
                    this.thematics[i].questions = questions;
                }
            });
        },
        resetGame() {
            this.currentQuestionNum = 1;
            this.isFiftyUsed = false;
            this.isTryUsed = false;
            this.isGameEnded = false;
            this.audio.src = 'audio/questionMusicLowQuestions.mp3';
            if (!this.isMuted) {
                this.audio.play();
            }
        },
        resetQuestion() {
            this.helpFiftyFiftyNumbers = [];
            this.isHelpTryActive = false;
            this.helpTryNumber = 0;
            this.isAnswerAcepted = false;
            this.chosenAnswer = 0;
        },
        setQuestions(questions) {
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
