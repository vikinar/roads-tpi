import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';
import { fetchCameraById } from '../../../../api/cameras';
import { DeviceType } from '../../../../types/deviceType';
import { cameraDeviceTypes } from '../../../../api/devices';

export const fetchCameraTypeRequest = createAsyncThunk('devices/fetchCameraType', async () => {
  const response = await cameraDeviceTypes();
  return response;
});

export type CameraType = CommonReducerType<DeviceType[]>;

const initialCameraState: CameraType = {
  loading: false,
  error: null,
  data: [],
};

const cameraType = createSlice({
  name: 'cameraDeviceId',
  initialState: initialCameraState,
  reducers: {},
  extraReducers: {
    [`${fetchCameraTypeRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const cameraTypeReducer = cameraType.reducer;
