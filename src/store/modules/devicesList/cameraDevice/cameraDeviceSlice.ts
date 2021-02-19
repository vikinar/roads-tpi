import { fetchCamerasById, fetchTpiById, fetchTPIDevices } from '../../../../api/devices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../../types/commonReducer';
import { Cameras } from '../../../../types/cameras';
import { fetchCameraById } from '../../../../api/cameras';

export const fetchCameraByIdRequest = createAsyncThunk('settings/devices/fetchCameraById', async (id:number) => {
  const response = await fetchCamerasById(id);
  return response;
});

export type CameraState = CommonReducerType<Cameras | null>;

const initialTpiState: CameraState = {
  loading: false,
  error: null,
  data: null,
};

const cameraById = createSlice({
  name: 'cameraDeviceId',
  initialState: initialTpiState,
  reducers: {},
  extraReducers: {
    [`${fetchCameraByIdRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const cameraByIdReducer = cameraById.reducer;
