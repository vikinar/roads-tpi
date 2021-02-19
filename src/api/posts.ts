import { http } from './http';

export const fetchPosts = async () => {
  const response = await http.get('/api/v1/posts');
  return response.data;
};

export const fetchMapPostById = async (id: number) => {
  const response = await http.get(`/api/v1/map/posts/${id}?isMock=true`);
  return response.data;
};

export const fetchPostById = async (id: number) => {
  const response = await http.get(`/api/v1/posts/${id}`);
  return response.data;
};


export const addPost = async (params: {
  description: string,
  lat: number,
  lon: number,
  name: string
}) => {
  const response = await http.post(`/api/v1/posts/`, {
    ...params,
  });

  return response.data;
};

export const updatePostById = async (id:any, params: {
  description: string,
  lat: number,
  lon: number,
  name: string
}) => {
  const response = await http.put(`/api/v1/posts/${id}`, {
    ...params,
  });

  return response.data;
};

export const deletePostById = async (id: number) => {
  const response = await http.delete(`/api/v1/posts/${id}`);
  await fetchPosts();
  return response.data;
};
