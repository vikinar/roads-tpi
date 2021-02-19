import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';

import { fetchMapDevices } from '../../../../api/map';
import { MapTpiDevice } from '../../../../types/mapTpiDevice';

export const fetchMapDevicesListRequset = createAsyncThunk('map-devices/fetchDevices', async () => {
  return await fetchMapDevices();
});

export type MapDevicesListState = CommonReducerType<MapTpiDevice[]>;

const initialState: MapDevicesListState = {
  loading: false,
  error: null,
  data: [],
};

const mapDevicesListSlice = createSlice({
  name: 'map-devices',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapDevicesListRequset.fulfilled}`]: (state: MapDevicesListState, action) => {
      state.data = action.payload;
    },
  },
});

export const mapDevicesListReducer = mapDevicesListSlice.reducer;
