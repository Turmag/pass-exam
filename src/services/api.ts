import axios from 'axios';
const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
import { Thematic } from '@/services/types';

export default {
    getThematics: (): Promise<{ data: Thematic[] }> => axios.get(`${path}/api/getThematics.php`),
    getThematicQuestions: (id: string): Promise<{ data: string }> => axios.post(`${path}/api/getThematicQuestions.php`, { thematicId: id }), 
};
