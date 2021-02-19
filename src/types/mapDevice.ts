export type MapDeviceType = {
  type: DeviceType;
  status: DeviceStatusType;
  statusComment: string;
  id: number;
  name: string;
};

export type DeviceType = {
  category: DeviceCategoryType;
  id: number;
  name: string;
};

export type DeviceCategoryType = 'TPI' | 'CAMERA';

export type DeviceStatusType = 'UNKNOWN' | 'SUCCESS' | 'WARNING' | 'OFFLINE' | 'ERROR';
