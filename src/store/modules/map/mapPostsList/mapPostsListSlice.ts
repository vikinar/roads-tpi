import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMapPosts } from '../../../../api/map';
import { MapPostType } from '../../../../types/mapPost';
import { CommonReducerType } from '../../../../types/commonReducer';
import { requestUtil } from '../../../../utils/requestUtil';

export const fetchMapPostsListRequset = createAsyncThunk('map-posts/fetchMapPosts', async () => {
  return await requestUtil(fetchMapPosts);
});

export type MapPostsListState = CommonReducerType<MapPostType[]>;

const initialState: MapPostsListState = {
  loading: false,
  error: null,
  data: [],
};

const mapPostsListSlice = createSlice({
  name: 'map-posts',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchMapPostsListRequset.fulfilled}`]: (state: MapPostsListState, action) => {
      if (!action.payload.error) {
        state.data = action.payload;
      }
    },
  },
});

export const mapPostsListReducer = mapPostsListSlice.reducer;
