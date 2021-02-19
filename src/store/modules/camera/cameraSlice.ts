import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCameraById } from '../../../api/cameras';
import { MapCameraType } from '../../../types/mapCamera';
import { CommonReducerType } from '../../../types/commonReducer';

export const fetchCameraRequest = createAsyncThunk('camera/fetchCamera', async (id: number) => {
  const response = await fetchCameraById(id);
  return response;
});

export type CameraState = CommonReducerType<MapCameraType | null>;

const initialState: CameraState = {
  loading: false,
  error: null,
  data: null,
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchCameraRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const cameraReducer = cameraSlice.reducer;

// export default messagesSlice.reducer;
