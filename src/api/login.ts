import { http } from './http';

export const login = async (params: { login: string; password: string }) => {
  const response = await http.post('/api/v1/accounts/login', {
    ...params,
    type: 'USER',
  });

  return response.data;
};
