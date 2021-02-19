import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getPostListReducer = (state: RootState) => {
  return state.postList;
};

export const getPostList = createSelector(getPostListReducer, postListReducer => {
  return postListReducer.data;
});
