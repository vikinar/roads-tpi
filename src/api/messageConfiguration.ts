import { http } from './http';

export const fetchMessageConfiguration = async (messageId: number) => {
    const response = await http.get(`/api/v1/tpi/messages/${messageId}/get-missing-configurations`);
    return response.data;
}