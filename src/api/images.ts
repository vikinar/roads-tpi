import { http } from './http';

export const putImageRequest = async (image: any) => {
    const response = await http.put('/api/v1/images/upload', image);
    return response.data
}