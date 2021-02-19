import { LastChangeType } from './lastChange';
import { DeviceType } from './deviceType';

export type Post = {
  description: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  error?: {
    status?: number
  };
  lastChange?: LastChangeType;
  devices?: DeviceType[];
};
