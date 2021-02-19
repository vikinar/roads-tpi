import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Tabs, Tab, List } from '@material-ui/core';
import { MapContext } from '../../pages/MapPage/MapPage';
import styles from './SideMenu.module.scss';
import { SideMenuItem } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapPostsListRequset } from '../../store/modules/map/mapPostsList/mapPostsListSlice';
import { fetchMapDevicesListRequset } from '../../store/modules/map/mapDevicesList/mapDevicesListSlice';
import { fetchMapCamerasListRequset } from '../../store/modules/map/mapCamerasList/mapCamerasListSlice';
import { RootState } from '../../store';
import cn from 'classnames';
// @ts-ignore
import ResizePanel from "react-resize-panel";

type TabType = 'pdk' | 'tpi' | 'camera';

type Props = {
  menuItems: {
    title: string;
    id: number;
    items: {
      title: string;
      id: number;
    }[];
  }[];
  onClick: (id: number, item?: Object) => void;
};

const tabsItems: {
  [key: string]: string;
} = {
  pdk: 'ПДК',
  tpi: 'ТПИ',
  camera: 'Камера',
};

export const SideMenu: React.FC<Props> = ({ onClick }) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<TabType>('pdk');

  useEffect(() => {
    if (selectedTab === 'pdk') {
      dispatch(fetchMapPostsListRequset());
    } else if (selectedTab === 'tpi') {
      dispatch(fetchMapDevicesListRequset());
    } else if (selectedTab === 'camera') {
      dispatch(fetchMapCamerasListRequset());
    }
  }, [selectedTab, dispatch]);

  const { showFooter, setMode } = useContext(MapContext);

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
        type: camera.device.type,
        title: camera.device.name,
        items: [],
      })),
    [cameras],
  );

  const devicesSideMenuItems = useMemo(
    () =>
      devices.map(device => ({
        ...device,
        type: device.device.type,
        title: device.device.name,
        items: [],
      })),
    [devices],
  );

  const items = useMemo(() => {
    switch (selectedTab) {
      case 'pdk':
        return postsSideMenuItems;
      case 'camera':
        return camerasSideMenuItems;
      case 'tpi':
        return devicesSideMenuItems;
    }
  }, [selectedTab, camerasSideMenuItems, postsSideMenuItems, devicesSideMenuItems]);

  return (
    <ResizePanel direction="e">
      <div className={cn(styles.container, 'header', 'panel')}>
      <div>
        <Tabs variant="fullWidth" value={selectedTab}>
          {Object.keys(tabsItems).map(key => (
            <Tab
              onClick={() => {
                setSelectedTab(key as TabType);
              }}
              key={key}
              value={key}
              label={tabsItems[key]}
            />
          ))}
        </Tabs>
        <div className={styles['list-container']}>
          <List className={styles.list} component="nav" disablePadding>
            {/* @ts-ignore */}
            {items.map(item => (
              <SideMenuItem
                // @ts-ignore
                key={item.id}
                onClick={(title, params, other) => {
                  console.log('params = ', params);
                  console.log('other = ', other);
                  if ((other as any).devices) {
                    setMode('pdk');
                  } else if ((other as any).type?.category === 'TPI') {
                    setMode('tpi');
                  } else {
                    setMode('camera');
                  }
                  showFooter(true);
                  // @ts-ignore
                  onClick(params.id, other, params);
                }}
                {...item}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
    </ResizePanel>
  );
};
