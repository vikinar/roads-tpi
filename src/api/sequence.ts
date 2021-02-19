import { http } from './http';


export const fetchSequences = async () => {
    const response = await http.get('/api/v1/tpi/message-sequences');
    return response.data;
}

export const fetchSequenceById = async (id: number) => {
    const response = await http.get('/api/v1/tpi/message-sequences/' + id);
    return response.data;
}