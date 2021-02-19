import { createSlice } from '@reduxjs/toolkit';
import { fetchCameraRequest } from '../camera';
import { fetchCamerasListRequset } from '../camerasList';
import { fetchDeviceRequset } from '../device';
import { fetchMapCamerasListRequset } from '../map/mapCamerasList/mapCamerasListSlice';
import { fetchMapPostsListRequset } from '../map/mapPostsList/mapPostsListSlice';
import { fetchMessageRequest } from '../message';
import { fetchMessagesListRequest } from '../messagesList';
import { fetchMapPostRequset } from '../post';

const actions = [
  fetchCameraRequest,
  fetchDeviceRequset,
  fetchCamerasListRequset,
  fetchMapPostRequset,
  fetchMessageRequest,
  fetchMapCamerasListRequset,
  fetchMapPostsListRequset,
  fetchMessagesListRequest,
];

const extraReducers = actions.reduce((acc, curr) => {
  return {
    ...acc,
    [`${curr.fulfilled}`]: (state: any, action: any) => {
      console.log('authAction = ', action);
      if (action.payload.error && action.payload.error.code === 403) {
        state.isAuth = false;
      }
    },
  };
}, {});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: null,
  },
  reducers: {
    setAuth: (state, action: any) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers,
});

export const { setAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
