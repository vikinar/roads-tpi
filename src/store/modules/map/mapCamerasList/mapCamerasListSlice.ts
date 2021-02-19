import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMapCameras } from '../../../../api/map';
import { MapCameraType } from '../../../../types/mapCamera';
import { CommonReducerType } from '../../../../types/commonReducer';

export const fetchMapCamerasListRequset = createAsyncThunk('map-cameras/fetchCameras', async () => {
  const response = await fetchMapCameras();
  return response;
});

export type MapCamerasListState = CommonReducerType<MapCameraType[]>;

const initialState: MapCamerasListState = {
  loading: false,
  error: null,
  data: [],
};

const mapCamerasListSlice = createSlice({
  name: 'map-cameras',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapCamerasListRequset.fulfilled}`]: (state: MapCamerasListState, action) => {
      state.data = action.payload;
    },
  },
});

export const mapCamerasListReducer = mapCamerasListSlice.reducer;
