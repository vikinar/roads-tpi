import { LastChangeType } from './lastChange';

export type MessageRealeseType = {
  configuration: MessageReleaseConfiguration;
  id: number;
  lastChange: LastChangeType;
  pages: MessageReleasePage[];
};

export type MessageReleaseConfiguration = {
  height: number;
  id: number;
  name: string;
  width: number;
};

export type MessageReleasePage = {
  backgroundColor: string;
  backgroundImageId: string;
  id: number;
  picture: MessageReleasePagePicture;
  textLines: MessageReleasePageTextLine[];
};

export type MessageReleasePagePicture = {
  alignment: 'LEFT' | 'CENTER' | 'RIGHT';
  horizontalMargin: number;
  imageId: string;
  scale: number;
  verticalMargin: number;
  width: number;
};

export type MessageReleasePageTextLine = {
  alignment: 'LEFT' | 'CENTER' | 'RIGHT';
  bold: boolean;
  fontColor: string;
  fontId: number;
  fontSize: number;
  id: number;
  italics: boolean;
  lineHeight: number;
  message: string;
  verticalMargin: number;
  rightMargin: number;
  leftMargin: number;
};


export type MessageReleaseFont = {
  id: number;
  name: string;
}