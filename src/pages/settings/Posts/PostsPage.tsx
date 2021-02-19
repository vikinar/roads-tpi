import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  List,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import styles from './PostsPage.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { HeaderPanel } from '../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import {dateTimeNormalize} from '../../../utils/dateTimeNormalize';
import { RootState } from '../../../store';
import { SideMenuItem } from '../../../components/SideMenu/components/SideMenuItem';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Column, Table } from '../../../components/Table/Table';
import { Add } from '@material-ui/icons';
import { deletePostRequest, fetchPostRequest } from '../../../store/modules/post/postSlice';
import { Status } from '../../../components/Status/Status';
import cn from 'classnames';

// @ts-ignore
import ResizePanel from "react-resize-panel";
import { fetchPostList } from '../../../store/modules/postsList';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import CloseIcon from '@material-ui/icons/Close';

export const PostsPage: React.FC = () => {
  const history = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.postList.data);
  const post = useSelector((state: RootState) => state.post.data);

  const [singlePost, setSinglePost] = useState<any>(posts)
  const [itemToDelete, setItemToDelete] = useState<any>()
  const [data, setData] = useState<any>([])
  const [sideMenu, setSideMenu] = useState<any>([])
  const [postId, setPostId] = useState<number>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false)

  const  deviceType = [
    {
      title: 'TPI',
      path: `/settings/${postId}/devices/add/tpi`
    },
    {
      title: 'Camera',
      path: `/settings/${postId}/devices/add/camera`
    }
  ]

  useEffect( () => {
    dispatch(fetchPostList());
  }, [dispatch]);

  useEffect( () => {
    !postId && setPostId(data[0]?.id);
    (postId !== -1 && postId) && dispatch(fetchPostRequest(postId));
  }, [dispatch, posts, postId, itemToDelete]);

  useMemo(() => setData(posts.map((item: any) => ({
      ...item,
      title: item.name,
    }))
  ), [posts])

  useMemo(() => {
    setSideMenu([
      ...data.map((item: any) => ({
        ...item,
        title: item.name,
        devices: [
          // @ts-ignore
          ...post?.devices?.map((item:any) => ({
            ...item,
            comment: item.status.comment
          }))
        ],
        lastChange: post?.lastChange
      }))
    ])
  }, [post, posts]);

  const handleDialogYes = useCallback(async () => {
    const newRows = data.filter((row:any) => {
      return row.id !== itemToDelete
    });
    setData(newRows);
    setPostId(-1)
    setSinglePost(null)
    setIsActionDialogOpen(false);
    await dispatch(deletePostRequest(itemToDelete));
  }, [itemToDelete, dispatch]);

  const handleSinglePost = useCallback((id:number) => {
    if(sideMenu[id].id !== postId) {
      setPostId(sideMenu[id].id)
    }
    setSinglePost(data[id])
  }, [sideMenu]);

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'name',
        title: 'Название',
        width: 300,
      },
      {
        name: 'type',
        width: 200,
        title: 'Тип',
      },
      {
        name: 'status',
        width: 200,
        title: 'Состояние',
      },
      {
        name: 'comment',
        width: 400,
        title: 'Детали',
      }
    ];
  }, [posts, post]);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, [isDialogOpen]);

  const handleActionDialogClose = useCallback(() => {
    setIsActionDialogOpen(false);
  }, [isActionDialogOpen])

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title={`ТПИ / Настройки / Посты / ${singlePost?.name || sideMenu[0]?.title}`} />
      <div className={styles.wrapper_inner}>
        <ResizePanel direction="e">
          <div className={cn(styles.list, 'header', 'panel')}>
            <div className={styles['list-title']}>Выберите пост</div>
            <List component="nav" disablePadding>
              {data?.length >0 && data?.map((item:any, index:number) => (
                <SideMenuItem key={item?.id} className={styles['menu-item']} onClick={() => handleSinglePost(index)} {...item} />
              ))}
            </List>
            <Button
              startIcon={<Add />}
              className={styles.list_btn}
              onClick = {() => history.push('/settings/add/post')}
            >Добавить</Button>
          </div>
        </ResizePanel>
        {((postId !== -1 && singlePost) && data.length > 0) && <div className={styles.content}>
          <div
            style={{
              minHeight: '100vh',
              flexGrow: 1,
              display: 'flex',
              margin: '0 50px',
              flexDirection: 'column',
            }}
          >
            <div className={styles.content_block}>
              <div className={styles.content_block_header}>
                <div className={styles.content_block_desc}>
                  <div className={styles.content_block_btns}>
                    <Button
                      onClick={() => {
                        history.push(`/settings/edit/post/${(singlePost && singlePost?.id) || sideMenu[0].id}`);
                      }}
                      className={styles.content_block_btn}
                    >Редактировать</Button>
                    <Button
                      onClick = {() => {
                        setItemToDelete(singlePost.id);
                        setIsActionDialogOpen(true);
                      }}
                      className={styles.content_block_btn}
                    >Удалить</Button>
                  </div>
                  <div className={styles.description_content}>
                    <div className={styles['description-title']}>{singlePost?.name || (sideMenu && sideMenu[0]?.name)}</div>
                    <div className={styles['description-text']}>{singlePost?.description || (sideMenu && sideMenu[0]?.description)}</div>
                    <div className={styles['description-text']}>
                      <div>
                        <span>Долгота: {singlePost?.lat || (sideMenu && sideMenu[0]?.lat)} </span>
                        <span> Широта: {(singlePost && singlePost?.lon) || (sideMenu && sideMenu[0]?.lon)}</span>
                      </div>
                      <div className={styles['description-text']}>Последнее изменение: {dateTimeNormalize(singlePost?.lastChange?.dateTime || sideMenu[0]?.lastChange.dateTime)} -
                        ({singlePost?.lastChange?.user.fullName || sideMenu[0]?.lastChange?.user?.fullName})</div>
                    </div>
                  </div>
                </div>
                <div className={styles.content_block_map}>
                  {sideMenu && sideMenu.length > 0 ?
                    <MapContainer className={styles['map-container']}
                                  center={[singlePost?.lat || (sideMenu[0] && sideMenu[0]?.lat), singlePost?.lon || (sideMenu[0] && sideMenu[0]?.lon)]}
                                  zoom={6} scrollWheelZoom={true} bounceAtZoomLimits={true}
                                  maxBoundsViscosity={.95}
                                  maxBounds={[[-180, -90], [180, 90]]}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[singlePost?.lat || (sideMenu[0] && sideMenu[0]?.lat), singlePost?.lon || (sideMenu[0] && sideMenu[0]?.lon)]}
                      >
                      </Marker>
                    </MapContainer> : <></>
                  }
                </div>
              </div>
              <div className={styles.table_btns}>
                <div className={styles['devices-title']}>Устройства</div>
                <Button
                  startIcon={<Add />}
                  className={styles.table_btn}
                  onClick = {() => setIsDialogOpen(true)}
                >Добавить</Button>
              </div>
              <Table
                columns={columns}
                className={styles.table}
                dataTypeProviders={[
                  {
                    for: ['name'],
                    formatterComponent: ({value}) => {
                      return <span>{value}</span>
                    },
                  },
                  {
                    for: ['type'],
                    formatterComponent: ({ value }) => {
                      return (
                        <span>
                        {value.name}
                      </span>)
                    },
                  },
                  {
                    for: ['status'],
                    formatterComponent: ({ value, row }) => {
                      return <div className={cn(styles.status, Status(value.status))}>{value.statusName}</div>
                    }
                  },
                  {
                    for: ['comment'],
                    formatterComponent: ({ value, row }) => {
                      return <span>{value}</span>
                    }
                  },
                ]}
                rows={singlePost?.devices || (sideMenu && sideMenu[0]?.devices || [])}
              />
            </div>
          </div>
        </div>

        }
      </div>
      <Dialog open={isDialogOpen}>
        <DialogTitle className={styles['dialog-header']}>
          <span>Тип устрйства</span>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles['dialog-content']}>
          <List component="nav">
            {deviceType?.map((item:any, index:number) => (
              <SideMenuItem key={item.index} className={styles['choose-list-item']} onClick={() => history.push(item.path)} {...item} />
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        isOpen={isActionDialogOpen}
        onClose={handleActionDialogClose}
        onYesClick={handleDialogYes}
        onNoClick={handleActionDialogClose}
        title="Вы уверены, что хотите удалить пост?"
      />
    </div>
  );
};
