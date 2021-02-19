import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { HeaderPanel } from '../../../../components/HeaderPanel';
// @ts-ignore
import ResizePanel from "react-resize-panel";
import cn from 'classnames';
import styles from './MapFooter.module.scss';
import { MapContext } from '../../MapPage';
import { DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Chip } from '@material-ui/core';
import { Table } from '../../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapPostRequset } from '../../../../store/modules/map/mapPost/mapPostSlice';
import { RootState } from '../../../../store';
import { Column } from '../../../../components/Table/Table';
import { fetchMapDeviceRequset } from '../../../../store/modules/map/mapDevice/mapDeviceSlice';
import { fetchMapCameraRequset } from '../../../../store/modules/map/mapCamera/mapCameraSlice';
import { Status } from '../../../../components/Status/Status';

export const MapFooter: React.FC = () => {
  const dispatch = useDispatch();
  const { mode, showFooter, itemId } = useContext(MapContext);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<any>(null);

  const postItem = useSelector((state: RootState) => state.map.post.data);
  const deviceItem = useSelector((state: RootState) => state.map.device.data);
  const cameraItem = useSelector((state: RootState) => state.map.camera.data);

  const postDevices = useMemo(() => postItem?.devices || [], [postItem]);

  const postName = useMemo(() => postItem?.name || '', [postItem]);
  const deviceName = useMemo(() => deviceItem?.device.name || '', [deviceItem]);
  const cameraName = useMemo(() => cameraItem?.device.name || '', [cameraItem]);

  const stateFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value }) => {
    return (
      <Chip label={value.statusName} color = 'primary' className={cn(styles.chip, Status(value.status))} />
    )
  };

  useEffect(() => {
    if (mode === 'pdk' && itemId) {
      dispatch(fetchMapPostRequset(itemId));
    } else if (mode === 'tpi' && itemId) {
      dispatch(fetchMapDeviceRequset(itemId));
    } else if (mode === 'camera' && itemId) {
      dispatch(fetchMapCameraRequset(itemId));
    }
  }, [itemId, mode, dispatch]);


  useEffect(() => {
    // const socket = io.io('ws://tpi-back.recursion.ru:8080/tpi-system/api/v1/socketHandler');

    const socketConn = new WebSocket('ws://tpi-back.recursion.ru:8080/tpi-system/api/v1/socketHandler');

    socketConn.onmessage = e => {
      setSocketData(JSON.parse(e.data));
    };

    setSocket(socketConn);
    return socket?.close()
  }, [itemId]);

  useEffect(() => {
    if ((mode === 'tpi') && socket && socket.readyState === 1 && itemId !== undefined) {
      socket.send(JSON.stringify({ command: 'getOneTpiCurrentImagesFrontendRequest', data: itemId }));
    } else if (mode === 'camera') {
      socket?.close();
    }
  }, [socket?.readyState]);

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'name',
        width: 200,
        title: 'Название',
      },
      {
        name: 'type',
        width: 250,
        title: 'Тип устройства',
      },
      {
        name: 'status',
        width: 200,
        title: 'Состояние',
      },
      {
        name: 'comment',
        width: 400,
        title: ' ',
      },
    ];
  }, []);

  return (
    <ResizePanel direction="n">
      <div className={cn(styles.footer, styles[`footer_${mode}`], 'header', 'panel')}>
        <HeaderPanel
          handle={false}
          title={mode === 'pdk' ? postName : mode === 'tpi' ? deviceName : cameraName}
          size="small"
          onClose={() => {
            showFooter(false);
          }}
        />
        {mode === 'pdk' ? (
          <div className={styles.table}>
            <Table
              dataTypeProviders={[
                {
                  for: ['status'],
                  formatterComponent: stateFormatterComponent,
                },
                {
                  for: ['comment'],
                  formatterComponent: ({ row }) => {
                    return <span>{row.status.comment}</span>;
                  },
                },
                {
                  for: ['type'],
                  formatterComponent: ({ value }) => {
                    return (
                      <span>
                      {value.category} ({value.name})
                    </span>
                    );
                  },
                },
              ]}
              columns={columns}
              rows={postDevices}
            />
          </div>
        ) : mode === 'tpi' ? (
          <div className={styles['tpi-content']}>
            <div className={styles['tpi-info']}>Устройство синхронизировано 2020.11.28 12:12:12</div>
            <img
              src={`http://tpi-back.recursion.ru:8080/tpi-system/api/v1/images/${
                socketData?.image?.id || (deviceItem && deviceItem?.imageId)
              }?isMock=true`}
              alt=""
              className={styles['tpi-message']}
            />
          </div>
        ) : (
          <div>
            <img
              src={`http://tpi-back.recursion.ru:8080/tpi-system/api/v1/images/${cameraItem && cameraItem?.photoId}?isMock=true`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        )}
      </div>
    </ResizePanel>
  );
};
