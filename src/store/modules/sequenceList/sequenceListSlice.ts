import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSequences } from '../../../api/sequence';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchSequencesListRequest = createAsyncThunk('post/fetchSequences', async () => {
  return await requestUtil(fetchSequences);
});

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const sequencesListSlice = createSlice({
  name: 'sequenceList',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchSequencesListRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const secuencesListReducer = sequencesListSlice.reducer;