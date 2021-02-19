import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../types/commonReducer';

import {
  addPost,
  deletePostById,
  fetchMapPostById,
  fetchPostById,
  updatePostById,
} from '../../../api/posts';
import { requestUtil } from '../../../utils/requestUtil';
import { Post } from '../../../types/post';

export const fetchMapPostRequset = createAsyncThunk('post/fetchMapPostId', async (id: number) => {
  const response = await fetchMapPostById(id);
  return response;
});

export const fetchPostRequest = createAsyncThunk('post/fetchPostById', async (id: number) => {
  return await requestUtil(fetchPostById, id);
});

export const newPostRequest = createAsyncThunk('posts/createPosts',async (params: {
  description: string,
  lat: number,
  lon: number,
  name: string
}) => {
  try {
    const response = await addPost(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

// @ts-ignore
export const updatePostRequest = createAsyncThunk('posts/updatePosts',async (params: {
  id: number,
  description: string,
  lat: number,
  lon: number,
  name: string
}) => {
  try {
    const response = await updatePostById(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deletePostRequest = createAsyncThunk('message/deletePost', async (id: number) => {
  return await requestUtil(deletePostById, id);
});

export type PostState = CommonReducerType<Post | null>;

const initialState: PostState = {
  loading: false,
  error: null,
  data: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchPostRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const postReducer = postSlice.reducer;

// export default messagesSlice.reducer;
