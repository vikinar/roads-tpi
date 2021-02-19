import { http } from './http';

export const fetchVideos = async () => {
  const response = await http.get('/api/v1/video/wall');
  return response.data;
};
