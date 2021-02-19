import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestUtil } from '../../../../utils/requestUtil';
import { fetchExternalGroupByid } from '../../../../api/externalRequests';

export const fetchExternalParametersByGroupId = createAsyncThunk(
  'external-parameters-group/fetchByGroupId',
  async (id: number) => {
    return await requestUtil(fetchExternalGroupByid, id);
  },
);

const initialState = {
  loading: false,
  error: null,
  data: undefined,
};

const externalParametersSlice = createSlice({
  name: 'external-parameters',
  initialState,
  reducers: {
  },
  extraReducers: {
    [`${fetchExternalParametersByGroupId.fulfilled}`]: (state: any, action: any) => {
      const { payload } = action;
      if (!payload.error) {
        state.data = payload;
      }
    },
  },
});

export const externalParametersReducer = externalParametersSlice.reducer;
