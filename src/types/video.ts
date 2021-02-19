export type DeviceStatus = {
  comment: string;
  status: string;
  statusName: string;
}

export type DeviceType = {
  category: string;
  id: number;
  name: string;
}

export type LastImage = {
  binaryDataId: number;
  format: string;
  height: number;
  id: string;
  md5: string;
  source: string;
  width: number;
}

export type LastImageType = {
  dataTime: string;
  image: LastImage;
}

export type Device = {
  id: number;
  name: string;
  status: DeviceStatus;
  type: DeviceType;
}

export type VideoType = {
  device: Device;
  lastImage: LastImageType | undefined;
}
