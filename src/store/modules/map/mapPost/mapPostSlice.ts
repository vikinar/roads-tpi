import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMapPostById } from '../../../../api/map';
import { MapPostType } from '../../../../types/mapPost';
import { CommonReducerType } from '../../../../types/commonReducer';
import { requestUtil } from '../../../../utils/requestUtil';

export const fetchMapPostRequset = createAsyncThunk('map-post/fetchMapPost', async (id: number) => {
  return await requestUtil(fetchMapPostById, id);
});

export type MapPostState = CommonReducerType<MapPostType | null>;

const initialState: MapPostState = {
  loading: false,
  error: null,
  data: null,
};

const mapPostSlice = createSlice({
  name: 'map-post',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapPostRequset.fulfilled}`]: (state: MapPostState, action) => {
      if (!action.payload.error) {
        state.data = action.payload;
      }
    },
  },
});

export const mapPostReducer = mapPostSlice.reducer;
