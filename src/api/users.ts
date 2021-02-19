import { http } from './http';
import { UserPassword, UserType } from '../types/user';


export const fetchUsers = async () => {
  const response = await http.get(`/api/v1/users`);
  return response.data;
};

export const fetchUser = async (id: number) => {
  const response = await http.get(`/api/v1/users/${id}`);
  return response.data;
};


export const addUser = async (params: UserType) => {
  const response = await http.post(`/api/v1/users`, {
    ...params,
  });

  return response.data;
};

export const updateUser = async (id: number, params: UserType) => {
  const response = await http.put(`/api/v1/users/${id}`, {
    ...params,
  });

  return response.data;
};

export const setPassword = async (id: number | undefined, params: UserPassword) => {
  const response = await http.put(`/api/v1/users/${id}/password`, {
    ...params,
  });

  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await http.delete(`/api/v1/users/${id}`);
  await fetchUsers();
  return response.data;
};
