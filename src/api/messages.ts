import {http} from './http';
import {MessageReleasePage} from "../types/messageRealese";

export const fetchMessages = async () => {
    const response = await http.get('/api/v1/tpi/messages');
    return response.data;
};

export const fetchMessageById = async (id: number) => {
    const response = await http.get(`/api/v1/tpi/messages/${id}`);
    return response.data;
};

export const addMessage = async (params: {
    code: string,
    description: string,
    priority: number
}) => {
    const response = await http.post(`/api/v1/tpi/messages`, {
        ...params,
    });

    return response.data;
};

export const updateMessageById = async (id: any, params: {
    code: string,
    description: string,
    priority: number
}) => {
    const response = await http.put(`/api/v1/tpi/messages/${id}`, {
        ...params,
    });

    return response.data;
};

export const deleteMessageById = async (id: number) => {
    const response = await http.delete(`/api/v1/tpi/messages/${id}`);
    await fetchMessages();
    return response.data;
};


export const fetchMessageReleases = async (id: number) => {
    const response = await http.get(`/api/v1/tpi/message-releases/${id}`);
    return response.data;
}

export const updateMessageReleases = async (data: any) => {
    const realizationId = data.realizationId;
    delete data['realizationId'];
    const response = await http.put(`/api/v1/tpi/message-releases/${realizationId}`, data);
    return response.data;
}

export const postMessageRealeseImage = async (data: any) => {
    const response = await http.post(`/api/v1/tpi/message-releases/preview-base64`, data);
    return response.data;
}

export const addMessageReleases = async (data: any) => {
    const response = await http.post(`/api/v1/tpi/message-releases`, data);
    return response.data;
}

export const deleteTpiMessage = async (id: number) => {
    const response = await http.delete('/api/v1/tpi/message-releases/' + id);
    return response.data;
}
