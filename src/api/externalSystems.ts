import { http } from './http';
import { ExternalSystemState } from '../store/modules/externalSystems/externalSystemsSlice';
import { ExternalSystem } from '../types/externalSystem';

export const fetchExternalSystems = async () => {
  const response = await http.get(`/api/v1/external-systems`);
  return response.data;
};

export const fetchExternalSystem = async (id: number) => {
  const response = await http.get(`/api/v1/external-systems/${id}`);
  return response.data;
};

export const addExternalSystem = async (params: ExternalSystem) => {
  const response = await http.post(`/api/v1/external-systems`, {
    ...params,
  });

  return response.data;
};

export const updateExternalSystem = async (id:any, params: ExternalSystem) => {
  const response = await http.put(`/api/v1/external-systems/${id}`, {
    ...params,
  });

  return response.data;
};


export const deleteExternalSystem = async (id: number) => {
  const response = await http.delete(`/api/v1/external-systems/${id}`);
  await fetchExternalSystems();
  return response.data;
};
