import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage, deleteMessageById, deleteTpiMessage, fetchMessageById, updateMessageById } from '../../../api/messages';
import { MessageType } from '../../../types/message';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchMessageRequest = createAsyncThunk('message/fetchMessages', async (id: number) => {
  return await requestUtil(fetchMessageById, id);
});


export const newMessageRequest = createAsyncThunk('message/updateMessages',async (params: {
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await addMessage(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

// @ts-ignore
export const updateMessageRequest = createAsyncThunk('message/updateMessages',async (params: {
  id: number,
  code: string,
  description: string,
  priority: number
}) => {
  try {
    const response = await updateMessageById(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deleteMessageRequest = createAsyncThunk('message/deleteMessage', async (id: number) => {
  return await requestUtil(deleteMessageById, id);
});

export const deleteTpiMessageRequest = createAsyncThunk(
  'tpiMessage/deleteMessage',
  async (id: number) => {
    return await requestUtil(deleteTpiMessage, id);
  }
)

export type MessagesState = CommonReducerType<MessageType | null>;

const initialState: MessagesState = {
  loading: false,
  error: null,
  data: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMessageRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
    [`${deleteTpiMessageRequest.fulfilled}`]: (state: any, action) => {
      state.loading = false;
    }
  },
});

export const messageReducer = messageSlice.reducer;
