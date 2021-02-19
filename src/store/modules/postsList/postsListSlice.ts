import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../../../api/posts';
import { requestUtil } from '../../../utils/requestUtil';
import { Post } from '../../../types/post';
import { CommonReducerType } from '../../../types/commonReducer';

export const fetchPostList = createAsyncThunk('post/fetchPosts', async () => {
  return await requestUtil(fetchPosts);
});

export type PostsListState = CommonReducerType<Post[]>;

const initialState: PostsListState= {
  loading: false,
  error: null,
  data: [],
};

const postsListSlice = createSlice({
  name: 'postList',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchPostList.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const postListReducer = postsListSlice.reducer;

// export default messagesSlice.reducer;
