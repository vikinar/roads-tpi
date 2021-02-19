import {http} from './http';

export const fetchFonts = async () => {
    const response = await http.get(`/api/v1/tpi/fonts`);
    return response.data;
}