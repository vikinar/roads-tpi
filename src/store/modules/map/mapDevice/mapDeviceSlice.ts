import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';

import { fetchMapDeviceById } from '../../../../api/map';
import { DeviceWithImageType } from '../../../../types/deviceWithImage';

export const fetchMapDeviceRequset = createAsyncThunk('map-device/fetchDevice', async (id: number) => {
  return await fetchMapDeviceById(id);
});

export type MapDeviceState = CommonReducerType<DeviceWithImageType | null>;

const initialState: MapDeviceState = {
  loading: false,
  error: null,
  data: null,
};

const mapDeviceSlice = createSlice({
  name: 'map-device',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapDeviceRequset.fulfilled}`]: (state: MapDeviceState, action) => {
      state.data = action.payload;
    },
  },
});

export const mapDeviceReducer = mapDeviceSlice.reducer;
