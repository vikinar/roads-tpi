import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSequenceById } from '../../../api/sequence';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchSequenceRequest = createAsyncThunk('post/fetchSequenceById', async (id: number) => {
  return await requestUtil(fetchSequenceById, id);
});

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const sequencesSlice = createSlice({
  name: 'sequence',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchSequenceRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const secuencesReducer = sequencesSlice.reducer;