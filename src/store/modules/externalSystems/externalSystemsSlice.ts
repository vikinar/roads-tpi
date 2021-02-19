import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';
import { addUser, deleteUser, fetchUser, fetchUsers, setPassword, updateUser } from '../../../api/users';
import { UserType } from '../../../types/user';
import { ExternalSystem } from '../../../types/externalSystem';
import {
  addExternalSystem,
  deleteExternalSystem,
  fetchExternalSystem, fetchExternalSystems,
  updateExternalSystem,
} from '../../../api/externalSystems';

export const fetchExternalSystemListRequest = createAsyncThunk('settings/externalSystemList', async () => {
  const response = await fetchExternalSystems();
  return response;
});

export const fetchExternalSystemRequest = createAsyncThunk('settings/externalSystem', async (id: number) => {
  return await requestUtil(fetchExternalSystem, id);
});

export const newExternalSystemRequest = createAsyncThunk('settings/addExternalSystem',async (params: ExternalSystem) => {
  try {
    const response = await addExternalSystem(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

// @ts-ignore
export const updateExternalSystemRequest = createAsyncThunk('settings/updateExternalSystem',async (params: ExternalSystem) => {
  try {
    const response = await updateExternalSystem(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deleteExternalSystemRequest = createAsyncThunk('settings/deleteExternalSystem', async (id: number) => {
  return await requestUtil(deleteExternalSystem, id);
});

export type ExternalSystemListState = CommonReducerType<ExternalSystem[]>;
export type ExternalSystemState = CommonReducerType<ExternalSystem | null>;

const initialListState: ExternalSystemListState = {
  loading: false,
  error: null,
  data: [],
};

const initialState: ExternalSystemState = {
  loading: false,
  error: null,
  data: null,
};

const externalSystemListSlice = createSlice({
  name: 'settings/externalSystemList',
  initialState: initialListState,
  reducers: {},
  extraReducers: {
    [`${fetchExternalSystemListRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

const externalSystemSlice = createSlice({
  name: 'settings/externalSystem',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchExternalSystemRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const externalSystemListReducer = externalSystemListSlice.reducer;
export const externalSystemReducer = externalSystemSlice.reducer;
