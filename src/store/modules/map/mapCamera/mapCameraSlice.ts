import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMapCameraById } from '../../../../api/map';
import { MapCameraType } from '../../../../types/mapCamera';
import { CommonReducerType } from '../../../../types/commonReducer';
import { requestUtil } from '../../../../utils/requestUtil';

export const fetchMapCameraRequset = createAsyncThunk('map-camera/fetchCamera', async (id: number) => {
  return await requestUtil(fetchMapCameraById, id);
});

export type MapCameraState = CommonReducerType<MapCameraType | null>;

const initialState: MapCameraState = {
  loading: false,
  error: null,
  data: null,
};

const mapCameraSlice = createSlice({
  name: 'map-camera',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapCameraRequset.fulfilled}`]: (state: MapCameraState, action) => {
      state.data = action.payload;
    },
  },
});

export const mapCameraReducer = mapCameraSlice.reducer;
