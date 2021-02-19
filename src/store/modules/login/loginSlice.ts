import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../../api/http';
import { login } from '../../../api/login';
import { CommonReducerType } from '../../../types/commonReducer';
import { setAuth } from '../auth';

export const loginRequest = createAsyncThunk('login/login', async (params: { login: string; password: string }) => {
  try {
    const response = await login(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

const initialState: CommonReducerType<{
  isAuth: boolean;
}> = {
  loading: false,
  error: null,
  data: {
    isAuth: false,
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [`${loginRequest.fulfilled}`]: (state, action) => {
      if (action.payload.error) {
        console.log('payload = ', action.payload);
      } else {
        console.log('payload!!! = ', action.payload);
        localStorage.setItem('token', action.payload.token);

        // http.defaults.headers.common['Authorization'] = action.payload.token;
        http.interceptors.request.use(function (config) {
          const token = action.payload.token;
          config.headers.Authorization = 'Bearer ' + token;

          return config;
        });

        state.data.isAuth = true;
      }
    },
    [`${loginRequest.rejected}`]: (state, action) => {
      console.log('action meta = ', action);
    },
  },
});

export const loginReducer = loginSlice.reducer;
