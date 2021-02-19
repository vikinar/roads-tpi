import React, { useState, useMemo, useEffect } from 'react';
import { HeaderPanel } from '../../components/HeaderPanel';
import { Map } from '../../components/Map';
import { SideMenu } from '../../components/SideMenu';
import styles from './MapPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MapFooter } from './components';
import { fetchMapPostsListRequset } from '../../store/modules/map/mapPostsList/mapPostsListSlice';
import { RootState } from '../../store';

type Mode = 'tpi' | 'pdk' | 'camera' | null;

export const MapContext = React.createContext<{
  isFooterShown: boolean;
  showFooter: (isShown: boolean) => void;
  mode: Mode;
  itemId: number | null;
  setMode: (mode: Mode) => void;
}>({
  isFooterShown: false,
  showFooter: () => {},
  mode: null,
  itemId: null,
  setMode: () => {},
});

export const MapPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMapPostsListRequset());
  }, [dispatch]);

  const [isFooterShown, showFooter] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(null);
  const [itemId, setItemId] = useState<number | null>(null);

  const posts = useSelector((state: RootState) => state.map.posts.data);
  const devices = useSelector((state: RootState) => state.map.devices.data);
  const cameras = useSelector((state: RootState) => state.map.cameras.data);

  const postsSideMenuItems = useMemo(
    () =>
      posts.map(post => ({
        ...post,
        title: post.name,
        items: post.devices.map(device => ({
          ...device,
          title: device.name,
        })),
      })),
    [posts],
  );

  const camerasSideMenuItems = useMemo(
    () =>
      cameras.map(camera => ({
        ...camera,
        id: camera.device.id,
        title: camera.device.name,
        items: [],
      })),
    [cameras],
  );

  const devicesSideMenuItems = useMemo(
    () =>
      devices.map(device => ({
        ...device,
        id: device.device.id,
        title: device.device.name,
        items: [],
      })),
    [devices],
  );

  const sideMenuItems = useMemo(() => {
    switch (mode) {
      case 'camera':
        return camerasSideMenuItems;
      case 'pdk':
        return postsSideMenuItems;
      case 'tpi':
        return devicesSideMenuItems;
      default:
        return postsSideMenuItems;
    }
  }, [mode, postsSideMenuItems, devicesSideMenuItems, camerasSideMenuItems]);

  return (
    <MapContext.Provider
      value={{
        isFooterShown,
        showFooter,
        itemId,
        mode,
        setMode,
      }}
    >
      <div className={styles.wrapper}>
        <HeaderPanel title="Карта" />
        <div className={styles.content}>

          <SideMenu
            // @ts-ignore
            onClick={(id, item, params) => {
              setItemId(id ? id : item.device.id);
            }}
            // @ts-ignore
            menuItems={sideMenuItems}
          />
          <div
            style={{
              height: '100vh',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Map />
            {isFooterShown ? <MapFooter /> : null}
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
};
