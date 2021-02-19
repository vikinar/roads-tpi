import { http } from './http';

export const fetchCameras = async () => {
  const response = await http.get('/map/cameras');
  return response.data;
};

export const fetchCameraById = async (id: number) => {
  const response = await http.get(`/map/cameras/${id}`);
  return response.data;
};
