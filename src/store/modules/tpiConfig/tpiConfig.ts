import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../types/commonReducer';
import {
  addTpiConfig,
  deleteTpiConfig,
  fetchTpiConfig,
  fetchTpiConfigList,
  updateTpiConfig,
} from '../../../api/tpiConfig';
import { TpiConfig } from '../../../types/tpiConfig';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchTpiConfigListRequest = createAsyncThunk('tpi/configs/list', async () => {
  const response = await fetchTpiConfigList();
  return response;
});

export const fetchTpiConfigRequest = createAsyncThunk('tpi/configs/one', async (id: number) => {
  return await requestUtil(fetchTpiConfig, id);
});

export const newTpiConfigRequest = createAsyncThunk('tpi/configs/add',async (params: TpiConfig) => {
  try {
    const response = await addTpiConfig(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

// @ts-ignore
export const updateTpiConfigRequest = createAsyncThunk('user/updateUser',async (params: TpiConfig) => {
  try {
    const response = await updateTpiConfig(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deleteTpiConfigRequest = createAsyncThunk('user/deleteUser', async (id: number) => {
  return await requestUtil(deleteTpiConfig, id);
});

export type tpiConfigListState = CommonReducerType<TpiConfig[]>;
export type tpiConfigState = CommonReducerType<TpiConfig | null>;

const initialListState: tpiConfigListState = {
  loading: false,
  error: null,
  data: [],
};

const initialState: tpiConfigState = {
  loading: false,
  error: null,
  data: null,
};

const tpiConfigList = createSlice({
  name: 'tpiConfigList',
  initialState: initialListState,
  reducers: {},
  extraReducers: {
    [`${fetchTpiConfigListRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

const tpiConfig = createSlice({
  name: 'tpiConfig',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchTpiConfigRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const tpiConfigListReducer = tpiConfigList.reducer;
export const tpiConfigReducer = tpiConfig.reducer;
