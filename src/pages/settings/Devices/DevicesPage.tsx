import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  List,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

import styles from './DevicesPage.module.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HeaderPanel } from '../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SideMenuItem } from '../../../components/SideMenu/components/SideMenuItem';
import { Column, Table } from '../../../components/Table/Table';
import { DeleteButton } from '../../../components/DeleteButton';
import { Add } from '@material-ui/icons';
import { Status } from '../../../components/Status/Status';
import cn from 'classnames';

import { fetchPostList } from '../../../store/modules/postsList';
import { fetchDevicesListRequest } from '../../../store/modules/devicesList';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { deleteDeviceRequest } from '../../../store/modules/devicesList/devicesListSlice';

export const DevicesPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const devices = useSelector((state: RootState) => state.deviceList.data);
  const posts = useSelector((state: RootState) => state.postList.data);

  const [itemToDelete, setItemToDelete] = useState<any>()
  const [data, setData] = useState<any>([])
  const [postId, setPostId] = useState<number>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false)

  const deviceType = [
    {
      title: 'TPI',
      path: `/settings/${postId}/devices/add/tpi`
    },
    {
      title: 'Camera',
      path: `/settings/${postId}/devices/add/camera`
    }
  ]

  useEffect(() => {
    dispatch(fetchDevicesListRequest());
    dispatch(fetchPostList());
  }, [dispatch]);

  const deviceList = useMemo(():any => {
    return devices.map((item: any) => ({
      ...item,
      comment: item.status.comment
    }))
  },  [devices]);

  useMemo(() => {
    setData(posts.map(item => ({
      ...item,
      devices: [
        ...deviceList.filter((device:any) => {
          return device.post.id === item.id
        })
      ]
    })))
  }, [posts, devices])

  const handleDelete = useCallback(() => {
    const newRows = data.map((item: any) => ({
      ...item,
      devices: item.devices.filter((row:any) => {
        return row.id !== itemToDelete
      })
    }));
    setData(newRows);
    setIsActionDialogOpen(false);
    dispatch(deleteDeviceRequest(itemToDelete));
  }, [dispatch, data, itemToDelete]);

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'name',
        title: 'Название',
        width: 200,
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
        width: 300,
        title: 'Детали',
      },
      {
        name: 'settings',
        width: 300,
        title: 'Настройки',
      },
      {
        name: 'delete',
        title: ' ',
        width: 90,
        align: 'right',
      },
    ];
  }, [devices]);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setIsActionDialogOpen(false)
  }, []);

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Настройки / Устройства" />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div
              style={{
                minHeight: '100vh',
                marginBottom: '30px',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className={styles.content_block}>
                <div className={styles.content_block_header}>
                  <h2 className={styles['description-title']}>Устройства</h2>
                  <div className={styles['description-text']}>
                    <p>Тут описание страницы</p>
                  </div>
                </div>
                {data.map((item:any) => {
                  return (
                    <>
                    <div className={styles.table_btns}>
                      <div className={styles['description-title']}>{item.name}</div>
                      <Button
                        startIcon={<Add />}
                        className={styles.table_btn}
                        onClick = {() => {
                          setIsDialogOpen(true)
                          setPostId(item.id)
                        }}
                      >Добавить</Button>
                    </div>
                    <div className={styles['table-item']}>
                  <Table
                    columns={columns}
                    className={styles.table}
                    dataTypeProviders={[
                      {
                        for: ['delete'],
                        formatterComponent: ({ row }) => {
                          return (
                            <DeleteButton
                              onClick={() => {
                                setItemToDelete(row.id)
                                setIsActionDialogOpen(true);
                              }}
                            />
                          );
                        },
                      },
                      {
                        for: ['name'],
                        formatterComponent: ({value, row}) => {
                          return <Link to={`/settings/${row.post.id}/devices/edit/${row.type.category === 'TPI' ? 'tpi' : 'camera'}/${row.id}/`}>{value}</Link>
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
                    rows={item.devices || []}
                  />
                  </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Dialog open={isDialogOpen}>
        <DialogTitle className={styles['dialog-header']}>
          <span>Тип устрйства</span>
          <IconButton onClick={() => setIsDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles['dialog-content']}>
          <List component="nav" disablePadding>
            {deviceType?.map((item:any, index:number) => (
              <SideMenuItem key={item.index} className={styles['choose-list-item']} onClick={() => history.push(item.path)} {...item} />
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        isOpen={isActionDialogOpen}
        onClose={handleDialogClose}
        onYesClick={handleDelete}
        onNoClick={handleDialogClose}
        title="Вы уверены, что хотите удалить устройство?"
      />
    </div>
  );
};
