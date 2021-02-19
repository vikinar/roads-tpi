import { Post } from './post';

export type CameraType = {
  selected: boolean;
  text: string;
  value: string;
}

export type Cameras = {
  login: string;
  name: string;
  password: string;
  pollInterval: number,
  post: Post;
  types: CameraType[];
  url: string;
}
