export type DeviceWithCoordinatesType = {
  id: number;
  lat: number;
  lon: number;
  name: string;
  status: 'UNKNOWN' | 'SUCCESS' | 'WARNING' | 'OFFLINE' | 'ERROR';
};
