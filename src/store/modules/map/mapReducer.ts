import { combineReducers } from 'redux';
import { mapCamerasListReducer } from './mapCamerasList';
import { mapDevicesListReducer } from './mapDevicesList';
import { mapPostsListReducer } from './mapPostsList';
import { mapDeviceReducer } from './mapDevice';
import { mapPostReducer } from './mapPost';
import { mapCameraReducer } from './mapCamera';

export const mapReducer = combineReducers({
  cameras: mapCamerasListReducer,
  posts: mapPostsListReducer,
  devices: mapDevicesListReducer,
  device: mapDeviceReducer,
  post: mapPostReducer,
  camera: mapCameraReducer,
});
