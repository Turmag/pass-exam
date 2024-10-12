import axios, { type AxiosResponse } from 'axios';
const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
import type { IThematic, IQuestion } from '@/shared/types';

export default {
    getThematics: (): Promise<AxiosResponse<IThematic[]>> => axios.get(`${path}/api/getThematics.php`),
    getThematicQuestions: (id: number): Promise<AxiosResponse<IQuestion[]>> => axios.post(`${path}/api/getThematicQuestions.php`, { thematicId: id }), 
};
