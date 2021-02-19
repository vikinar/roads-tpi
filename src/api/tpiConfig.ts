import { http } from './http';
import { TpiConfig } from '../types/tpiConfig';

export const fetchTpiConfigList = async () => {
  const response = await http.get('/api/v1/tpi/configurations');
  return response.data;
};

export const fetchTpiConfig = async (id: number) => {
  const response = await http.get(`/api/v1/tpi/configurations/${id}`);
  return response.data;
};

export const addTpiConfig = async (params: TpiConfig) => {
  const response = await http.post(`/api/v1/tpi/configurations`, {
    ...params,
  });

  return response.data;
};

export const updateTpiConfig = async (id:any, params: TpiConfig) => {
  const response = await http.put(`/api/v1/tpi/configurations/${id}`, {
    ...params,
  });

  return response.data;
};

export const deleteTpiConfig = async (id: number) => {
  const response = await http.delete(`/api/v1/tpi/configurations/${id}`);
  await fetchTpiConfigList();
  return response.data;
};

