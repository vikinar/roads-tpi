import { LastChangeType } from './lastChange';

export type MessageType = {
  code?: string;
  description: string;
  enable: boolean;
  externalPropertiesCount: number;
  id: number;
  lastChange: LastChangeType;
  releases: MessageReleaseType[];
  externalParameters: any;
  priority: number
  showCondition: string;
};

export type MessageReleaseType = {
  configuration: string;
  id: number;
  imageId: number;
  lastChange: LastChangeType;
};
