import { createSelector } from 'reselect';
import { RootState } from '../..';

export const getDevicesListReducer = (state: RootState) => {
  return state.deviceList;
};

export const getDevicesList = createSelector(getDevicesListReducer, devicesListReducer => {
  return devicesListReducer.data;
});
