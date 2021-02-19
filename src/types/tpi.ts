import { Post } from './post';

export type TPITypeConfig = {
  selected: boolean;
  text: string;
  value: string;
}

export type TPI = {
  configurations: TPITypeConfig[];
  ip: string,
  port: number,
  name: string;
  password: string;
  pollInterval: number,
  post: Post;
  types: TPITypeConfig[];
  url: string;
}
