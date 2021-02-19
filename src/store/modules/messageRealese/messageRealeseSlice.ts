import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MessageRealeseType, MessageReleasePage} from '../../../types/messageRealese';
import {CommonReducerType} from '../../../types/commonReducer';
import {requestUtil} from "../../../utils/requestUtil";
import {addMessageReleases, fetchMessageReleases, updateMessageReleases} from "../../../api/messages";


export const fetchMessageRealeseRequest = createAsyncThunk(
    'messageRealese/fetchMessageRealese',
    async (id: number) => {
        return requestUtil(fetchMessageReleases, id);
    });

export const postMessageRealeseRequest = createAsyncThunk(
    'messageRealese/postMessageRealese',
    async (data: any) => {
        return requestUtil(addMessageReleases, data);
    }
)


const initialState: any = {
    loading: false,
    error: null,
    data: null
};

export const updateMessageRealeseRequest = createAsyncThunk(
    'messageRealese/updateMessageRealese',
    async (data: any) => {
        return requestUtil(updateMessageReleases, data);
    }
)

const messageRealeseSlice = createSlice({
    name: 'messageRealese',
    initialState: initialState,
    reducers: {
        loadingRealese: (state) => {
            state.loading = true;
        }
    },
    extraReducers: {
        [`${fetchMessageRealeseRequest.fulfilled}`]: (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        [`${updateMessageRealeseRequest.fulfilled}`]: (state: any, action) => {
            state.loading = false;
        },
        [`${postMessageRealeseRequest.fulfilled}`]: (state: any, action) => {
            state.loading = false;
        }
    },
});


export const {loadingRealese} = messageRealeseSlice.actions;
export const messageRealeseReducer = messageRealeseSlice.reducer;
