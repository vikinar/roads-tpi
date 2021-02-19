import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCameras } from '../../../api/cameras';
import { MapCameraType } from '../../../types/mapCamera';
import { CommonReducerType } from '../../../types/commonReducer';

export const fetchCamerasListRequset = createAsyncThunk('cameras/fetchCameras', async () => {
  const response = await fetchCameras();
  return response;
});

export type CamerasListState = CommonReducerType<MapCameraType[]>;

const initialState: CamerasListState = {
  loading: false,
  error: null,
  data: [],
};

const camerasListSlice = createSlice({
  name: 'cameras',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchCamerasListRequset.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const camerasListReducer = camerasListSlice.reducer;
