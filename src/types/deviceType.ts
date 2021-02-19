export type DeviceType = {
  category: DeviceCategoryType;
  status?: DeviceStatusType;
  statusInfo: StatusName;
  statusComment?: string;
  id: number;
  name: string;
};

export type StatusName = {
  statusName: string
}

export type DeviceCategoryType = 'TPI' | 'CAMERA';

export type DeviceStatusType = 'UNKNOWN' | 'SUCCESS' | 'WARNING' | 'OFFLINE' | 'ERROR';
