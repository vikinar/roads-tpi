import { LastChangeType } from './lastChange';
import { DeviceStatusType } from './mapDevice';

export type ParameterGroup = {
  "code": string;
  "description": string;
  "id": number;
}

export type ParameterType = {
  "code": string;
  "description": string;
  group?: ParameterGroup;
  "id": number;
  "lifeTime": number;
  "testValue": string;
  "type": string;
}

export type ParametersType = {
  "externalSystemName": string;
  "id": number;
  "packageName": string;
  "receiveTime": string;
  "parameter": ParameterType;
}

export type DeviceType = {
  configuration: string;
  id: number;
  name: string;
  messages: DeviceMessageType[];
  statusInfo: DeviceStatusInfoType;
  palimpsest: DevicePalimpsetType;
  lastImage?: LastImageType;
  lastSyncTime?: string | null;
  parameters: ParametersType[];
};

export type LastImageType = {
  format: 'JPEG' | 'PNG';
  height: number;
  width: number;
  id: number;
};

export type DeviceMessageType = {
  image: any;
  isSynchronized: boolean;
  id: number;
  statusComment: string;
  message: DeviceMessageDataType;
};

export type DeviceMessageDataType = {
  lastChange: LastChangeType;
  id: number;
  priority: number;
  enable: boolean;
  code: string;
  description: string;
  externalPropertiesCount: number;
};

export type DeviceStatusInfoType = {
  message: string;
  statusName?: string;
  status: DeviceStatusType;
};

export type DevicePalimpsetType = {
  id: number;
  name: string;
};
