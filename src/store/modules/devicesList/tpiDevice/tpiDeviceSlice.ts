import { fetchTpiById, fetchTPIDevices } from '../../../../api/devices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';
import { TPI } from '../../../../types/tpi';

export const fetchTpiByIdRequest = createAsyncThunk('settings/devices/fetchTpiById', async (id:number) => {
  const response = await fetchTpiById(id);
  return response;
});

export type TpiDevicesListState = CommonReducerType<TPI | null>;

const initialTpiState: TpiDevicesListState = {
  loading: false,
  error: null,
  data: null,
};

const tpiById = createSlice({
  name: 'tpiDeviceId',
  initialState: initialTpiState,
  reducers: {},
  extraReducers: {
    [`${fetchTpiByIdRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const tpiByIdReducer = tpiById.reducer;
