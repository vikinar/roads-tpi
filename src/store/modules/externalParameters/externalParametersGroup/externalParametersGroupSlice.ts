import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {requestUtil} from '../../../../utils/requestUtil';
import {
    fetchAddParameterInGroup, fetchEditExternalGroupGroup,
    fetchExternalAddGroup,
    fetchExternalGroups,
    fetchExternalRemoveGroupById
} from '../../../../api/externalRequests';
import {
    IExternalGroupRequest,
    IExternalParameterRequest
} from "../../../../types/externalParameters";

export const fetchExternalParametersGroupRequest = createAsyncThunk(
    'external-parameters-groups/fetchGroups',
    async () => {
        return await requestUtil(fetchExternalGroups);
    },
);

export const fetchExternalAddGroupRequest = createAsyncThunk(
    'external-parameters-groups/addGroup',
    async (data: any) => {
        return await requestUtil(fetchExternalAddGroup, data);
    },
);

export const fetchExternalParametersRemoveGroupByIdRequest = createAsyncThunk(
    'external-parameters-groups/removeGroup',
    async (id: number) => {
        return await requestUtil(fetchExternalRemoveGroupById, id);
    }
)

export const fetchAddParamaterInGroupReqeuest = createAsyncThunk(
    'external-parameters-groups/addParameter',
    async (data: IExternalParameterRequest) => {
        return await requestUtil(fetchAddParameterInGroup, data);
    }
);

export const fetchEditExternalGroupRequest = createAsyncThunk(
    'external-parameters-groups/editGroup',
    async (data: IExternalGroupRequest) => {
        return await requestUtil(fetchEditExternalGroupGroup, data);
    }
);

const initialState = {
    loading: false,
    error: null,
    data: [],
};

const externalParametersGroupSlice = createSlice({
    name: 'external-parameters-groups',
    initialState,
    reducers: {
        startLoadingGroups(state) {
            state.loading = true;
        },
        resetGroupsState(state) {
            state.data = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: {
        [`${fetchExternalParametersGroupRequest.fulfilled}`]: (state: any, action) => {
            if (!action.payload.error) {
                state.data = action.payload;
                state.loading = false;
            }
        },
        [`${fetchExternalAddGroupRequest.fulfilled}`]: (state: any, action) => {
            state.loading = false;
        },
        [`${fetchExternalParametersRemoveGroupByIdRequest.fulfilled}`]: (state: any, action) => {
            state.loading = false;
        },
        [`${fetchAddParamaterInGroupReqeuest.fulfilled}`]: (state, action) => {
            state.loading = false;
        }
    },
});

export const {startLoadingGroups, resetGroupsState} = externalParametersGroupSlice.actions;
export const externalParametersGroupReducer = externalParametersGroupSlice.reducer;
