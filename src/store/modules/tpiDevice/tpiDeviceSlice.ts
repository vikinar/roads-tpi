import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateTpiDevicePalimpsest } from '../../../api/tpiDevice';

export const fetchTpiDevicePalimpsestRequest = createAsyncThunk('user/updateUser',async (params: {deviceId: number, palimpsestId: number}) => {
  try {
    const response = await updateTpiDevicePalimpsest(params.deviceId, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);
    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});
