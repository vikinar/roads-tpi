import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getDeviceReducer = (state: RootState) => {
  return state.device;
};

export const getDevice = createSelector(getDeviceReducer, deviceReducer => {
  return deviceReducer.data;
});

export const getDeviceMessages = createSelector(getDevice, device => {
  return device?.messages || [];
});
