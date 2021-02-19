import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getMessageRealeseImageReducer = (state: RootState) => {
  return state.messageRealeseImage;
};

export const getMessageRealeseImage = createSelector(getMessageRealeseImageReducer, messageRealeseImageReducer => {
  return messageRealeseImageReducer.data;
});