import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVideos } from '../../../api/videos';
import { VideoType } from '../../../types/video';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';

export const fetchVideoListRequest = createAsyncThunk('video/fetchVideos', async () => {
  return await requestUtil(fetchVideos);
});

export type VideosState = CommonReducerType<VideoType[]>;

const initialState: VideosState = {
  loading: false,
  error: null,
  data: [],
};

const videoListSlice = createSlice({
  name: 'videos',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchVideoListRequest.fulfilled}`]: (state: any, action) => {
      if (!action.payload.error) {
        state.data = action.payload;
      }
    },
  },
});

export const videoListReducer = videoListSlice.reducer;
