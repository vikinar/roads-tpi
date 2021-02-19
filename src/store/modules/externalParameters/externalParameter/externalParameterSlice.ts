import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {requestUtil} from '../../../../utils/requestUtil';
import {
    fetchAddParameter,
    fetchDeleteParameter,
    fetchEditParameter,
    fetchGetParameter,
} from '../../../../api/externalRequests';
import { IExternalParameter } from '../../../../types/externalParameters';

export const fetchExternalParameterByIdRequest = createAsyncThunk(
    'external-parameters-group/fetchExternalParameter',
    async (id: number) => {
        return await requestUtil(fetchGetParameter, id);
    },
);

export const fetchExternalParameterAddRequest = createAsyncThunk(
  'external-parameters-group/fetchExternalParameterAdd',
  async (data: IExternalParameter) => {
      return await requestUtil(fetchAddParameter, data);
  }
);

export const fetchExternalParameterEditRequest = createAsyncThunk(
    'external-parameters-group/fetchExternalParameterEdit',
    async (data: any) => {
        return await requestUtil(fetchEditParameter, data);
    }
);

export const fetchExternalParameterDeleteRequest = createAsyncThunk(
    'external-parameters-group/fetchExternalParameterDelete',
    async (id: number) => {
        return await requestUtil(fetchDeleteParameter, id);
    }
);

const initialState: any = {
    loading: false,
    error: null,
    data: {},
};

const externalParameterSlice = createSlice({
    name: 'external-parameters',
    initialState,
    reducers: {
        loadingParameters: (state) => {
            state.loading = true;
        }
    },
    extraReducers: {
        [`${fetchExternalParameterByIdRequest.fulfilled}`]: (state: any, action: any) => {
            const {payload} = action;
            if (!payload.error) {
                state.data = payload;
            }
            state.loading = false;
        },
        [`${fetchExternalParameterDeleteRequest.fulfilled}`]: (state, action) => {
            state.loading = false;
        },
        [`${fetchExternalParameterEditRequest.fulfilled}`]: (state, action) => {
            state.loading = false;
        }
    },
});

export const {loadingParameters} = externalParameterSlice.actions;
export const externalParameterReducer = externalParameterSlice.reducer;
