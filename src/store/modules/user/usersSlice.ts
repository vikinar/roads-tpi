import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonReducerType } from '../../../types/commonReducer';
import { requestUtil } from '../../../utils/requestUtil';
import { addUser, deleteUser, fetchUser, fetchUsers, setPassword, updateUser } from '../../../api/users';
import { UserPassword, UserType } from '../../../types/user';

export const fetchUsersRequest = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers();
  return response;
});

export const fetchUserRequest = createAsyncThunk('users/fetchUser', async (id: number) => {
  return await requestUtil(fetchUser, id);
});

export const newUserRequest = createAsyncThunk('users/addUser',async (params: UserType) => {
  try {
    const response = await addUser(params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

// @ts-ignore
export const updateUserRequest = createAsyncThunk('user/updateUser',async (params: UserType) => {
  try {
    const response = await updateUser(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const setPasswordRequest = createAsyncThunk('users/updateUserPassword',async (params: UserPassword) => {
  try {
    const response = await setPassword(params.id, params);
    return response;
  } catch (e) {
    console.log('error!!! = ', e.response);

    return {
      error: e.response.data?.error || e.response.data,
    };
  }
});

export const deleteUserRequest = createAsyncThunk('user/deleteUser', async (id: number) => {
  return await requestUtil(deleteUser, id);
});

export type UserListState = CommonReducerType<UserType[]>;
export type UserState = CommonReducerType<UserType | null>;

const initialListState: UserListState = {
  loading: false,
  error: null,
  data: [],
};

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
};

const userListSlice = createSlice({
  name: 'users',
  initialState: initialListState,
  reducers: {},
  extraReducers: {
    [`${fetchUsersRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${fetchUserRequest.fulfilled}`]: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const userListReducer = userListSlice.reducer;
export const userReducer = userSlice.reducer;
