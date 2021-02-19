import React, { useContext, useEffect, useMemo } from 'react';
import { MapContainer, Popup, Marker, TileLayer } from 'react-leaflet';
import styles from './Map.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapPostsListRequset } from '../../store/modules/map/mapPostsList/mapPostsListSlice';
import { RootState } from '../../store';
import { MapContext } from '../../pages/MapPage/MapPage';

export const Map: React.FC = () => {
  const dispatch = useDispatch();
  const { mode, showFooter, itemId } = useContext(MapContext);

  useEffect(() => {
    dispatch(fetchMapPostsListRequset());
  }, [dispatch]);

  const posts = useSelector((state: RootState) => state.map.posts.data);

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

  return (
    <div className={styles['map-container-wrapper']}>
      {postsSideMenuItems.length > 0 &&
      <MapContainer className={styles['map-container']} center={[postsSideMenuItems[0].lat, postsSideMenuItems[0].lon]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          postsSideMenuItems.map(post => (
            <Marker
              position={[post.lat, post.lon]}
              key = {post.id}
              eventHandlers = {{click: e => {
                  console.log(e);
                  return showFooter(true);
                }}}
            >
              <Popup>{post.title}</Popup>
            </Marker>
          ))
        }
      </MapContainer> }
    </div>
  );
};
