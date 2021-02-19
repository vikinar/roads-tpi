import { http } from './http';

export const updateTpiDevicePalimpsest = async (deviceId:number, params: {palimpsestId: number}) => {
  const response = await http.put(`/api/v1/tpi/devices/${deviceId}/set-palimpsest/?palimpsestId=${params.palimpsestId}`, {
    ...params,
  });

  return response.data;
};
