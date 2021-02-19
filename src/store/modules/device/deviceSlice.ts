import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTPIDeviceById } from '../../../api/devices';
import { CommonReducerType } from '../../../types/commonReducer';
import { DeviceType } from '../../../types/device';

export const fetchDeviceRequset = createAsyncThunk('device/fetchDevice', async (id: number) => {
  const response = await fetchTPIDeviceById(id);
  return response;
});

export type DeviceState = CommonReducerType<DeviceType | null>;

const initialState: DeviceState = {
  loading: false,
  error: null,
  data: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchDeviceRequset.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const deviceReducer = deviceSlice.reducer;
