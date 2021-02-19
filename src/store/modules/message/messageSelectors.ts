import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getMessageReducer = (state: RootState) => {
  return state.message;
};

export const getMessageReleaseReducer = (state: RootState) => {
  return state.messageRealese;
}

export const getMessage = createSelector(getMessageReducer, messageReducer => {
  return messageReducer.data;
});

export const getMessageReleases = createSelector(getMessageReducer, messageReducer => {
  return messageReducer.data?.releases || [];
});

export const getReleases = createSelector(getMessageReleaseReducer, messageReducer => {
  return messageReducer.data;
});

export const getReleasesLoading = createSelector(getMessageReleaseReducer, messageReducer => {
  return messageReducer.loading;
});
