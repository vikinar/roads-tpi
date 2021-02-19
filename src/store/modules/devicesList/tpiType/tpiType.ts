import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';
import { fetchCameraById } from '../../../../api/cameras';
import { DeviceType } from '../../../../types/deviceType';
import { tpiDeviceTypes } from '../../../../api/devices';

export const fetchTpiTypeRequest = createAsyncThunk('devices/fetchTpiType', async () => {
  const response = await tpiDeviceTypes();
  return response;
});

export type TpiType = CommonReducerType<DeviceType[]>;

const initialTpiState: TpiType = {
  loading: false,
  error: null,
  data: [],
};

const tpiType = createSlice({
  name: 'tpiDeviceId',
  initialState: initialTpiState,
  reducers: {},
  extraReducers: {
    [`${fetchTpiTypeRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const tpiTypeReducer = tpiType.reducer;
