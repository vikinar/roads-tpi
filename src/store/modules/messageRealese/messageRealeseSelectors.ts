import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getMessageRealeseReducer = (state: RootState) => {
  return state.messageRealese;
};

export const getMessageRealese = createSelector(getMessageRealeseReducer, messageRealeseReducer => {
  return messageRealeseReducer.data;
});
