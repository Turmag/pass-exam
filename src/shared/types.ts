export interface IThematic {
    id: number;
    name: string;
    questions: IQuestion[];
}

export interface IQuestion {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    difficulty: number;
    id: number;
    question: string;
    rightAnswer: number;
}
