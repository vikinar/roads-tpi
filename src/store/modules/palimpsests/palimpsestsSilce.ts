import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MessageType } from '../../../types/message';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';
import { fetchPalimpsestsList } from '../../../api/palimpsests';
import { Palimpsest } from '../../../types/palimpsests';


export const fetchPalimpsestsListRequest = createAsyncThunk('palimpsests/fetchPalimpsestsList', async () => {
  return await requestUtil(fetchPalimpsestsList);
});

export type PalimpsestsListState = CommonReducerType<Palimpsest[]>;

const initialState: PalimpsestsListState = {
  loading: false,
  error: null,
  data: [],
};

const palimpsestsListSlice = createSlice({
  name: 'palimpsests',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchPalimpsestsListRequest.fulfilled}`]: (state: any, action) => {
      if (!action.payload.error) {
        state.data = action.payload;
      }
    },
  },
});

export const palimpsestListReducer = palimpsestsListSlice.reducer;

