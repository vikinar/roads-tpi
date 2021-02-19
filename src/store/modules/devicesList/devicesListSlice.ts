import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../types/commonReducer';

import { addCamera, addTPI, deleteDeviceById, fetchDevices, updateCamera, updateTPI } from '../../../api/devices';
import { DeviceType } from '../../../types/device';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchDevicesListRequest = createAsyncThunk('settings/fetchTPIDevices', async () => {
  const response = await fetchDevices();
  return response;
});


export const newCameraRequest = createAsyncThunk('settings/device/newCamera',async (params: {
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await addCamera(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const newTpiRequest = createAsyncThunk('settings/device/newTpi',async (params: {
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await addTPI(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const updateCameraRequest = createAsyncThunk('settings/device/updateTpi',async (params: {
  id: number,
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await updateCamera(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const updateTpiRequest = createAsyncThunk('settings/device/updateTpi',async (params: {
  id: number,
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await updateTPI(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deleteDeviceRequest = createAsyncThunk('settings/device/deleteDevice', async (id: number) => {
  return await requestUtil(deleteDeviceById, id);
});

export type DevicesListState = CommonReducerType<DeviceType[]>;

const initialState: DevicesListState = {
  loading: false,
  error: null,
  data: [],
};

const devicesListSlice = createSlice({
  name: 'settings/devices',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchDevicesListRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const devicesListReducer = devicesListSlice.reducer;
