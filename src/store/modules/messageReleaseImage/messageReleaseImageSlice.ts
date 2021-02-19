import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postMessageRealeseImage } from "../../../api/messages";
import { requestUtil } from "../../../utils/requestUtil";

export const postMessageReleaseImage = createAsyncThunk(
    'messageRealeseImage/postMessageRealeseImage',
    async (data: any) => {
        return requestUtil(postMessageRealeseImage, data);
    }
);

const initialState = {
    loading: false,
    data: '',
    error: null
};

const messageRealeseSlice = createSlice({
    name: 'messageReleaseImage',
    initialState,
    reducers: {},
    extraReducers: {
        [`${postMessageReleaseImage.fulfilled}`]: (state: any, action) => {
            state.data = action.payload
        }
    }
});

export const messageRealeseImageReducer = messageRealeseSlice.reducer;