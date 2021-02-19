import React, { useEffect, useMemo, useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import styles from './VideoPage.module.scss';
import { HeaderPanel } from '../../components/HeaderPanel';
import { VideoItem } from '../../components/VideoItem';
import { RangeInput } from '../../components/RangeInput';
import { useDispatch, useSelector } from 'react-redux';
import {dateTimeNormalize} from '../../utils/dateTimeNormalize';
import { RootState } from '../../store';
import { fetchVideoListRequest } from '../../store/modules/video/videoListSlice';

export const VideoPage: React.FC = () => {
  const [blockWidth, setBlockWidth] = useState(25);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<any>(null);
  const [idList, setIdList] = useState<any>([])

  const dispatch = useDispatch();

  const videos: any = useSelector((state: RootState) => state.video.data);

  useEffect(() => {
      dispatch(fetchVideoListRequest());
  }, [dispatch]);

  useEffect(()=> {
    console.log(idList);
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ command: 'getCameraListCurrentImagesFrontendRequest', data: [...idList] }));
    }
  }, [socket?.readyState])

  const camerasViews = useMemo(
    () => {
      const id:any = [];
      for(let video of videos){
        id.push(video.device.id);
        setIdList([...id])
      }
      return videos.map((video:any) => {
        return{
        ...video
      }})},
    [videos],
  );

  useEffect(() => {
    // const socket = io.io('ws://tpi-back.recursion.ru:8080/tpi-system/api/v1/socketHandler');
    console.log('here!!!!');
    console.log(socketData);

    const socketConn = new WebSocket('ws://tpi-back.recursion.ru:8080/tpi-system/api/v1/socketHandler');

    socketConn.onmessage = e => {
      setSocketData(JSON.parse(e.data));
    };

    setSocket(socketConn);
  }, []);

  const handleBlockWidthChange = (event: any) => {
    setBlockWidth(event.target.value);
  };
  // @ts-ignore
  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Видео" />
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <RangeInput label="Размер изображения" /> */}
          {/* <TextField
            value={blockWidth}
            onChange={handleBlockWidthChange}
            rowsMax={blockWidth}
            InputProps={{ inputProps: { min: 10, max: 100 } }}
            className={styles.range}
            type="range"
            label="Размер изображения"
          /> */}
          <RangeInput
            label="Размер изображения"
            min={10}
            max={100}
            value={blockWidth}
            onChange={handleBlockWidthChange}
            rowsMax={blockWidth}
          />
          <TextField label="Все посты" />
        </div>
        <div className={styles.videos}>
          {camerasViews.map((item:any) => {
            return (
            <VideoItem
              style={{
                width: `${blockWidth}%`,
              }}
              key={item.device.id}
              name={item.device.name}
              date={dateTimeNormalize(item.lastImage?.dataTime)}
              imageSrc={`http://tpi-back.recursion.ru:8080/tpi-system/api/v1/images/${
                (socketData?.device.id === item.device.id && socketData?.image?.image?.id) || (item.lastImage && item.lastImage?.image.id)
              }?isMock=true`}
            />
          )})}
        </div>
      </div>
    </div>
  );
};
