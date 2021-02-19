import { http } from './http';

export const fetchMessageReleaseById = async (id: number) => {
  const response = await http.get(`/tpi/message-releases/${id}`);
  return response.data;
};

export const deleteMessageReleaseById = async (id: number) => {
  const response = await http.delete(`/tpi/message-releases/${id}`);
  return response.data;
};
