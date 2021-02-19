import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchDeviceRequset } from '../../store/modules/device';
import {
  Button,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel, MenuItem, Select,
  TextField,
} from '@material-ui/core';
import { HeaderPanel } from '../../components/HeaderPanel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RangeInput } from '../../components/RangeInput';
import { getDevice, getDeviceMessages } from '../../store/modules/device';

import styles from './DevicePage.module.scss';
import { Table } from '../../components/Table';
import { DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { http } from '../../api/http';
import { dateTimeNormalize } from '../../utils/dateTimeNormalize';
import cn from 'classnames';
import { fetchPalimpsestsListRequest } from '../../store/modules/palimpsests/palimpsestsSilce';
import { RootState } from '../../store';
import { fetchTpiDevicePalimpsestRequest } from '../../store/modules/tpiDevice/tpiDeviceSlice';

export const DevicePage: React.FC = () => {
  const [blockWidth, setBlockWidth] = useState(70);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<any>(null);
  const [checked, setChecked] = useState<any>(false);
  const messages = useSelector(getDeviceMessages);

  const [message, setMessages] = useState<any>(messages)
  const [currentImg, setCurrentImg] = useState<number>(message[0]?.id)
  const [currentRow, setCurrentRow] = useState<any>(message[0])
  const [active, setActive] = useState(false)
  const [isPalimpsestDialogOpen, setIsPalimpsestDialogOpen] = useState<boolean>(false);
  const [palimpsestValue, setPalimpsestValue] = useState<any>()
  const [palimpsestList, setPalimpsestList] = useState<any>([])

  const handleBlockWidthChange = (event: any) => {
    setBlockWidth(event.target.value);
  };

  const params: any = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeviceRequset(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    dispatch(fetchPalimpsestsListRequest())
  }, [dispatch])

  const device = useSelector(getDevice);
  const palimpsests = useSelector((state: RootState) => state.palimpsestsList.data)

  useMemo(() => {
    setPalimpsestList(palimpsests)
  }, [palimpsests])

  useMemo(() => {
    setCurrentImg(messages[0]?.image?.id)
  }, [messages, checked])

  useEffect(() => {
    if(checked && socketData){
      setCurrentImg(socketData?.image?.id)
    } else {
      setCurrentImg(messages[0]?.image?.id)
    }
  }, [socketData])


  useEffect(():any => {
    if(!checked) {
      const socketConn = new WebSocket('ws://tpi-back.recursion.ru:8080/tpi-system/api/v1/socketHandler');
      socketConn.onmessage = e => {
        setSocketData(JSON.parse(e.data));
      };
      setSocket(socketConn);
    }
    return socket
  }, [checked]);

  const codeFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value, row }: any) => {
    return <Link to={`/message/${row.message.id}`}>{row.message.code}</Link>;
  };

  const parameterDataTypeProvider = [
    {
      for: ['group'],
      formatterComponent: ({value, row}: any) => {
        return <span>{row.parameter.group?.code}</span>
      },
    },
    {
      for: ['code'],
      formatterComponent: ({ value, row }: any) => {
        return (
            <span>
            {row.parameter.code}
          </span>)
      },
    },
    {
      for: ['description'],
      formatterComponent: ({ value, row }: any) => {
        return (<span>
          {row.parameter.description}
        </span>)
      }
    },
    {
      for: ['lifeTime'],
      formatterComponent: ({ value, row }: any) => {
        return <span>{row.parameter.lifeTime}</span>
      }
    },
    {
      for: ['receiveTime'],
      formatterComponent: ({ value, row }: any) => {
        return <span>{dateTimeNormalize(value)}</span>
      }
    },
  ]

  const messagesDataProvider = [
    {
      for: ['code'],
      formatterComponent: codeFormatterComponent,
    },
    {
      for: ['description'],
      formatterComponent: ({ value, row }: any) => {
        return <span className={cn(styles['row'], currentImg === row.image?.id && styles.active)} onClick={() => handleCurrentImg(row)}>{row.message.description}</span>;
      },
    },
    {
      for: ['enable'],
      formatterComponent: ({ value, row }: any) => {
        return <span>{row.message.enable ? 'Отображается' : 'Не отображается'}</span>;
      },
    },
    {
      for: ['isSynchronized'],
      formatterComponent: ({ value }: any) => {
        return <span>{value ? 'Выполнено' : 'Ожидается'}</span>;
      },
    },
  ]

  const columns = useMemo(() => {
    return [
      {
        name: 'code',
        title: 'Код',
        width: 200,
        headerClassName: styles['table-header'],
      },
      {
        name: 'description',
        title: 'Описание',
        width: 200,
        headerClassName: styles['table-header'],
      },
      {
        name: 'enable',
        title: 'Статус',
        width: 400,
        headerClassName: styles['table-header'],
      },
      {
        name: 'isSynchronized',
        title: 'Синхронизация',
        width: 300,
        headerClassName: styles['table-header'],
      },
    ];
  }, []);

  const parameterColumns = [
    {
      name: 'group',
      title: 'Группа',
      width: 170,
    },
    {
      name: 'code',
      title: 'Код',
      width: 170,
    },
    {
      name: 'description',
      title: 'Описание',
      width: 170,
    },
    {
      name: 'value',
      title: 'Значение',
      width: 120,
    },
    {
      name: 'lifeTime',
      title: 'Время жизни',
      width: 150,
    },
    {
      name: 'receiveTime',
      title: 'Время получения',
      width: 200,
    },
    {
      name: 'externalSystemName',
      title: 'Внешняя система',
      width: 180,
    },
  ]

  const handleEnabledImg = (e:any) => {
    setChecked(e.target.checked)
    if(!e.target.checked && socket && socket?.readyState === 1 && device){
      socket.onclose = () => {
        console.log('Web Socket Connection Closed');
      };
      socket?.close();
      setSocket(null);
    } else {
      return socket?.send(JSON.stringify({ command: 'getOneTpiCurrentImagesFrontendRequest', data: device?.id }))
    }
  }

  const handleCurrentImg = (row:any) => {
    if(!checked) {
      const newRows = message.filter((img: any) => {
        return img.id == row.message.id;
      });
      setCurrentRow(newRows[0]);
      setCurrentImg(newRows[0]?.image?.id);
      setActive(true);
    }
  }

  useMemo(() => {
    setMessages(messages)
  }, [messages])

  const syncNow = async () => {
    try {
      const response = await http.post(`/api/v1/tpi/devices/${device?.id}/sync`);
      return response.data;
    } catch (err) {
      return err;
    }
  };

  const filterSync = (e:any) => {
    const newRows = messages?.filter((item:any) => {
      return item.isSynchronized;
    });
    if(e.target.checked){
      setMessages(newRows);
    } else {
      setMessages(messages);
    }
  }

  const handlePalimpsestChange = (e:any) => {
    setPalimpsestValue({
      deviceId: device?.id,
      [e.target.name]: e.target.value
    })
  }

  const handlePalimpsestSubmit = async () => {
    await dispatch(fetchTpiDevicePalimpsestRequest({ ...palimpsestValue }))
    await dispatch(fetchDeviceRequset(params.id));
    setIsPalimpsestDialogOpen(false)
  }

  return (
      <div className={styles.wrapper}>
        <HeaderPanel title={`ТПИ / Устройства / ${device?.name}`} />
        <Container>
          <div className={styles.header}>
            <div className={styles['header-content']}>
              <div>
                <h2> {device?.name}</h2>
              </div>
              <div>
                <Button color="primary" variant="contained" onClick = {syncNow}>
                  Синхронизировать сейчас
                </Button>
              </div>
            </div>
            <div className={styles['header-content']}>
              <div>
                <div>Конфигурация: {device?.configuration}</div>
                <div>Статус: {device?.statusInfo?.statusName}</div>
              </div>
              <div>
                  <div className={styles['header-content__item']}>
                    Палимпсест: <span onClick={() => setIsPalimpsestDialogOpen(true)}>{device?.palimpsest ? device?.palimpsest?.name : `Выбрать палимпсест`}</span>
                  </div>
              </div>
              <div>
                <div>Последняя синхронизация</div>
                <div>{dateTimeNormalize(device?.lastSyncTime)}</div>
              </div>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles['table-header']}>
              <div>Сообщения</div>
              <div>
                <FormControlLabel control={<Checkbox color="primary" onChange = {filterSync}/>} label="Только синхронизированные" />
              </div>
            </div>
            <div>
              <Table
                  className={styles['table-grid']}
                  columns={columns}
                  rows={message}
                  dataTypeProviders={messagesDataProvider}
              />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles['block-header']}>
              <div className={styles['block-header__item']}>
                <div className={styles['block-title']}>ГОЛОЛЁД</div>
                <div className={styles['sub-title']}>ТПИ 1000*250</div>
              </div>
              <div className={styles['block-header__item']}>
                <FormControlLabel control={<Checkbox onChange={handleEnabledImg} color="primary" />} label="Показывать текущее" />
              </div>
              <div className={styles['block-header__item']}>
                <RangeInput
                    label="Размер изображения"
                    value={blockWidth}
                    onChange={handleBlockWidthChange}
                    rowsMax={blockWidth}
                    min={50}
                    max={100}
                />
              </div>
            </div>
            <div style={{ width: `${blockWidth}%`, maxHeight: '100%' }} className={styles['block-content']}>
              <img style={{ width: `${blockWidth}%` }} src={`http://tpi-back.recursion.ru:8080/tpi-system/api/v1/images/${currentImg}`} alt="" />
            </div>
          </div>
          <div className={styles['table-settings']}>
            <div className={styles['table-header']}>
              <div>Внешние параметры</div>
            </div>
            <div className={styles['settings-grid']}>
              <Table
                  className={styles['table-grid']}
                  columns={parameterColumns}
                  rows = {device?.parameters || []}
                  dataTypeProviders={parameterDataTypeProvider}

              />
            </div>
            <div className={styles['settings-btn']}>
              <Button color="primary" variant="contained">
                Задать значения вручную
              </Button>
            </div>
          </div>
        </Container>
        <Dialog open={isPalimpsestDialogOpen}>
          <DialogTitle>Выбрать палимпсест</DialogTitle>
          <DialogContent className={styles.dialog}>
            <div className={styles['form-line']}>
              <FormControl className={styles.input}>
                <InputLabel className={styles.label} htmlFor="name-shared">Палимпсест</InputLabel>
                <Select
                    value={palimpsestValue?.palimpsestId}
                    onChange={handlePalimpsestChange}
                    variant = {'outlined'}
                    inputProps={{
                      name: "palimpsestId",
                      id: "palimpsestId"
                    }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {palimpsestList.map((palimpsest:any) => (
                      <MenuItem key={"palimpsestId" + palimpsest.id} value={palimpsest.id}>
                        {palimpsest.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePalimpsestSubmit} variant={'contained'} color = 'primary'>Добавить</Button>
            <Button onClick={() => setIsPalimpsestDialogOpen(false)}>Отмена</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};
