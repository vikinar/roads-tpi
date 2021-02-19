import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getSequencesListReducer = (state: RootState) => {
  return state.sequencesList;
};

export const getSequenceListSelector = createSelector(getSequencesListReducer, sequencesListReducer => {
  return sequencesListReducer.data;
});
