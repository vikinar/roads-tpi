// @ts-ignore
import { DeviceType } from '../../../../types/device';
// @ts-ignore
import { fetchTPIDevices } from '../../../../api/devices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';

export const fetchTpiList = createAsyncThunk('settings/devices/fetchTPIDevices', async () => {
  const response = await fetchTPIDevices();
  return response;
});

export type TpiDevicesListState = CommonReducerType<DeviceType[]>;

const initialTpiState: TpiDevicesListState = {
  loading: false,
  error: null,
  data: [],
};

const tpiDevicesListSlice = createSlice({
  name: 'tpiDevices',
  initialState: initialTpiState,
  reducers: {},
  extraReducers: {
    [`${fetchTpiList.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const tpiDevicesListReducer = tpiDevicesListSlice.reducer;
