import { http } from './http';
import { fetchMessages } from './messages';

export const fetchTPIDevices = async () => {
  const response = await http.get('/api/v1/tpi/devices');
  return response.data;
};

export const fetchTPIDeviceById = async (id: number) => {
  const response = await http.get(`/api/v1/tpi/devices/${id}`);
  return response.data;
};

export const fetchTpiById = async (id: number) => {
  const response = await http.get(`/api/v1/devices/tpi/${id}/edit`)
  return response.data;
}

export const fetchCamerasById = async (id: number) => {
  const response = await http.get(`/api/v1/devices/cameras/${id}/edit`)
  return response.data;
}

export const fetchDevices = async () => {
  const response = await http.get('/api/v1/devices');
  return response.data;
};


export const addCamera = async (params: {code: string,
  description: string,
  priority: number}) => {
  const response = await http.post(`/api/v1/devices/cameras`, {
    ...params,
  });

  return response.data;
};

export const addTPI = async (params: {code: string,
  description: string,
  priority: number}) => {
  const response = await http.post(`/api/v1/devices/tpi`, {
    ...params,
  });

  return response.data;
};

export const updateCamera = async (id:any, params: {code: string,
  description: string,
  priority: number}) => {
  const response = await http.put(`/api/v1/devices/cameras/${id}`, {
    ...params,
  });

  return response.data;
};

export const updateTPI = async (id:any, params: {code: string,
  description: string,
  priority: number}) => {
  const response = await http.put(`/api/v1/devices/tpi/${id}`, {
    ...params,
  });

  return response.data;
};

export const deleteDeviceById = async (id: number) => {
  const response = await http.delete(`/api/v1/devices/${id}`);
  await fetchMessages();
  return response.data;
};

export const tpiDeviceTypes = async () => {
  const response = await http.get('/api/v1/devices/tpi/types');
  return response.data;
};

export const cameraDeviceTypes = async () => {
  const response = await http.get('/api/v1/devices/cameras/types');
  return response.data;
}
