import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://tpi-back.recursion.ru:8080/tpi-system',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});