import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getSequencesReducer = (state: RootState) => {
  return state.sequences;
};

export const getSequenceSelector = createSelector(getSequencesReducer, sequencesReducer => {
  return sequencesReducer.data;
});
