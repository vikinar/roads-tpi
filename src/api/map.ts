import { http } from './http';

export const fetchMapDevices = async () => {
  const response = await http.get('/api/v1/map/tpi-devices');
  return response.data;
};

export const fetchMapDeviceById = async (id: number) => {
  const response = await http.get(`/api/v1/map/tpi-devices/${id}`);
  return response.data;
};

export const fetchMapCameras = async () => {
  const response = await http.get('/api/v1/map/cameras');
  return response.data;
};

export const fetchMapCameraById = async (id: number) => {
  const response = await http.get(`/api/v1/map/cameras/${id}`);
  return response.data;
};

export const fetchMapPosts = async () => {
  const response = await http.get('/api/v1/map/posts');
  return response.data;
};

export const fetchMapPostById = async (id: number) => {
  const response = await http.get(`/api/v1/map/posts/${id}`);
  return response.data;
};
