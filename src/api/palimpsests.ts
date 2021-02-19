import { http } from './http';

export const fetchPalimpsestsList = async () => {
  const response = await http.get('/api/v1/tpi/palimpsests');
  return response.data;
};
