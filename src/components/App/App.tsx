import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { MapPage } from '../../pages/MapPage';
import { LoginPage } from '../../pages/LoginPage';
import { MessagesPage } from '../../pages/MessagesPage';
import { MessagePage } from '../../pages/MessagePage';
import { EditMessagePage } from '../../pages/EditMessagePage';
import { DevicesPage } from '../../pages/DevicesPage';
import { DevicePage } from '../../pages/DevicePage';
import { PostsPage } from '../../pages/settings/Posts/PostsPage';
import { DevicesPage as DeviceSettings } from '../../pages/settings/Devices/DevicesPage';

import styles from './App.module.scss';
import { VideoPage } from '../../pages/VideoPage';
import { ImagePage } from '../../pages/ImagePage';
import { EditImagePage } from '../../pages/EditImagePage';
import { RealizationPage } from '../../pages/RealizationPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EditPost } from '../../pages/settings/Posts/edit/EditPost';
import { UsersPage } from '../../pages/settings/User/UsersPage';
import { EditUser } from '../../pages/settings/User/edit/EditUser';
import { EditTPI } from '../../pages/settings/Devices/editTPI/editTPI';
import { EditCamera } from '../../pages/settings/Devices/editCamera/editCamera';
import { ExternalParametersPage } from "../../pages/ExternalParametersPage";
import { ExternalParameterPage } from "../../pages/ExternalParameterPage";
import { ExternalSystemsPage } from '../../pages/settings/externalSystems/externalSystems';
import { EditExternalSystem } from '../../pages/settings/externalSystems/edit/editExternalSystem';
import { TpiConfigPage } from '../../pages/TpiConfig/TpiConfigPage';
import { EditTpiConfig } from '../../pages/TpiConfig/edit/EditTpiConfig';
import { SequencePage } from '../../pages/SequencePage';

const AuthContainer = ({ children }: any) => {
  const [hasToRedirect, setHasToRedirect] = useState(false);

  const location = useLocation();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth !== null) {
      setHasToRedirect(!isAuth);
    }
  }, [isAuth]);

  if (hasToRedirect && location.pathname !== '/login') {
    return <Redirect to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <AuthContainer>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/map" component={MapPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/messages" component={MessagesPage} />
            <Route path="/message/:id" component={MessagePage} />
            <Route path="/add/message" component={EditMessagePage} />
            <Route path="/edit/message/:id" component={EditMessagePage} />
            <Route path="/video" component={VideoPage} />
            <Route path="/image" component={ImagePage} />
            <Route path="/edit/image" component={EditImagePage} />
            <Route path="/devices" component={DevicesPage} />
            <Route path="/device/:id" component={DevicePage} />
            <Route path="/realization/:id/:messageId" component={RealizationPage} />
            <Route path="/configurations" component={TpiConfigPage} />
            <Route path="/configuration/add" component={EditTpiConfig} />
            <Route path="/configuration/edit/:id" component={EditTpiConfig} />
            <Route path="/settings/posts" component={PostsPage}></Route>
            <Route path="/settings/edit/post/:id" component={EditPost}></Route>
            <Route path="/settings/add/post" component={EditPost}></Route>
            <Route path="/settings/devices" component={DeviceSettings}></Route>
            <Route path="/settings/:postId/devices/add/tpi" component={EditTPI}></Route>
            <Route path="/settings/:postId/devices/add/camera" component={EditCamera}></Route>
            <Route path="/settings/:postId/devices/edit/tpi/:id" component={EditTPI}></Route>
            <Route path="/settings/:postId/devices/edit/camera/:id" component={EditCamera}></Route>
            <Route path="/settings/users" component={UsersPage}></Route>
            <Route path="/settings/edit/user/:id" component={EditUser}></Route>
            <Route path="/settings/add/user" component={EditUser}></Route>
            <Route path="/settings/external-systems" component={ExternalSystemsPage}></Route>
            <Route path="/settings/edit/external-system/:id" component={EditExternalSystem}></Route>
            <Route path="/settings/add/external-system" component={EditExternalSystem}></Route>
            <Route path="/externalParameters/:id" component={ExternalParametersPage}></Route>
            <Route path="/externalParameters" component={ExternalParametersPage}></Route>
            <Route path="/externalParameter/:parameterId" component={ExternalParameterPage} />
            <Route path="/sequecne/:id" component={SequencePage} />
            <Route path="/sequecne" component={SequencePage} />
          </Switch>
        </AuthContainer>
      </Router>
    </div>
  );
}

export default App;
