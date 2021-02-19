import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages } from '../../../api/messages';
import { MessageType } from '../../../types/message';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';

// export const fetchMessages = createAsyncThunk('slo/fetchPeople', async (userId, thunkAPI) => {
//   const response = await axios.get('http://tpi-back.recursion.ru:8080/tpi-system/tpi/messages?isMock=true');
//   return response.data;
// });
export const fetchMessagesListRequest = createAsyncThunk('messages/fetchMessages', async () => {
  return await requestUtil(fetchMessages);
});

export type MessagesState = CommonReducerType<MessageType[]>;

const initialState: MessagesState = {
  loading: false,
  error: null,
  data: [],
};

const messagesListSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMessagesListRequest.fulfilled}`]: (state: any, action) => {
      if (!action.payload.error) {
        state.data = action.payload;
      }
    },
  },
});

export const messagesListReducer = messagesListSlice.reducer;

// export default messagesSlice.reducer;
