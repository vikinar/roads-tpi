import { MapDeviceType } from './mapDevice';

export type MapPostType = {
  devices: MapDeviceType[];
  id: number;
  name: string;
  lat: number;
  lon: number;
  description: string;
};

export type PostStatusType = 'UNKNOWN' | 'SUCCESS' | 'WARNING' | 'OFFLINE' | 'ERROR';
