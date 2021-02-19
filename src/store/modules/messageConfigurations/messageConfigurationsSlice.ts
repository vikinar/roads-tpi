import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessageConfiguration } from "../../../api/messageConfiguration";
import { requestUtil } from "../../../utils/requestUtil";

export const fetchMessageConfigurationRequest = createAsyncThunk(
    'messsageConfiguration/fecthMessageConfiguration',
    async (messageId: number) => {
        return requestUtil(fetchMessageConfiguration, messageId);
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null
};

const messageConfigurationSlice = createSlice({
    name: 'messageConfiguration',
    initialState,
    reducers: {},
    extraReducers: {
        [`${fetchMessageConfigurationRequest.fulfilled}`]: (state: any, action) => {
            state.data = action.payload;
        }
    }
});

export const messageConfigurationReducer = messageConfigurationSlice.reducer;