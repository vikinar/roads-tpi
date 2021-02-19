import { messagesListReducer } from './modules/messagesList';
import { messageRealeseReducer } from './modules/messageRealese/';
import { messageReducer } from './modules/message/';
import { camerasListReducer } from './modules/camerasList/';
import { cameraReducer } from './modules/camera/';
import { postReducer } from './modules/post/';
import { devicesListReducer } from './modules/devicesList/';
import { deviceReducer } from './modules/device/';
import { mapReducer } from './modules/map';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './modules/login';
import { authReducer } from './modules/auth';
import { videoListReducer } from './modules/video/videoListSlice';
import { postListReducer } from './modules/postsList';
import { tpiDevicesListReducer } from './modules/devicesList/tpiDeviceList/tpiDeviceListSlice';
import { userListReducer, userReducer } from './modules/user/usersSlice';
import { tpiByIdReducer } from './modules/devicesList/tpiDevice/tpiDeviceSlice';
import { cameraByIdReducer } from './modules/devicesList/cameraDevice/cameraDeviceSlice';
import { cameraTypeReducer } from './modules/devicesList/cameraTpye/cameraType';
import { tpiTypeReducer } from './modules/devicesList/tpiType/tpiType';
import { tpiConfigListReducer, tpiConfigReducer } from './modules/tpiConfig/tpiConfig';
import { externalSystemListReducer, externalSystemReducer } from './modules/externalSystems/externalSystemsSlice';
import {externalReducer} from "./modules/externalParameters";
import { fontsReducer } from './modules/fonts';
import { messageRealeseImageReducer } from './modules/messageReleaseImage/messageReleaseImageSlice';
import { messageConfigurationReducer } from './modules/messageConfigurations';
import { externalParametersReducer } from './modules/externalParameters/externalParameters/externalParametersSlice';
import { externalParameterReducer } from './modules/externalParameters/externalParameter';
import { palimpsestListReducer } from './modules/palimpsests/palimpsestsSilce';
import { secuencesListReducer } from './modules/sequenceList/sequenceListSlice';
import { secuencesReducer } from './modules/sequence';

const rootReducer = combineReducers({
  messages: messagesListReducer,
  messageRealese: messageRealeseReducer,
  message: messageReducer,
  camerasList: camerasListReducer,
  camera: cameraReducer,
  post: postReducer,
  postList: postListReducer,
  tpiDevicesList: tpiDevicesListReducer,
  tpiById: tpiByIdReducer,
  tpiType: tpiTypeReducer,
  tpiConfigList: tpiConfigListReducer,
  tpiConfig: tpiConfigReducer,
  cameraById: cameraByIdReducer,
  cameraType: cameraTypeReducer,
  device: deviceReducer,
  deviceList: devicesListReducer,
  map: mapReducer,
  login: loginReducer,
  auth: authReducer,
  video: videoListReducer,
  user: userReducer,
  userList: userListReducer,
  externalSystem: externalSystemReducer,
  externalSystemList: externalSystemListReducer,
  externalParameters: externalReducer,
  fonts: fontsReducer,
  messageRealeseImage: messageRealeseImageReducer,
  messageConfiguration: messageConfigurationReducer,
  sequencesList: secuencesListReducer,
  sequences: secuencesReducer,
  externalParametersByGroupId: externalParametersReducer,
  externalParameter: externalParameterReducer,
  palimpsestsList: palimpsestListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
