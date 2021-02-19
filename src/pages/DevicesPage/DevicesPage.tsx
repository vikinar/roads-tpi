import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Button,
  Container,
  TextField,
  Dialog,
  ListItem,
  ListItemText,
  List,
  DialogTitle,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { HeaderPanel } from '../../components/HeaderPanel';
import styles from './DevicesPage.module.scss';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table';
import { DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { fetchTpiList } from '../../store/modules/devicesList/tpiDeviceList';
import { RootState } from '../../store';

const getRows = () => [
  {
    id: 1,
    device: 'ТПИ-01',
    configuration: 'ТПИ 1000*250',
    status: 'Синхронизирован 15.12.2020 18:56:51',
    palimpset: 'Палимпсест - 01',
    messages: 'Сообщение - 01',
  },
  {
    id: 2,
    device: 'ТПИ-02',
    configuration: 'ТПИ 1000*250',
    status: 'Синхронизирован 15.12.2020 18:56:51',
    palimpset: 'Палимпсест - 01',
    messages: 'Сообщение - 01',
  },
  {
    id: 3,
    device: 'ТПИ-03',
    configuration: 'ТПИ 1000*250',
    status: 'Синхронизирован 15.12.2020 18:56:51',
    palimpset: 'Палимпсест - 01',
    messages: 'Сообщение - 01',
  },
];

export const DevicesPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(getRows);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTpiList());
  }, [dispatch]);

  const devicesList = useSelector((state: RootState) => state.tpiDevicesList.data);

  console.log('devicesList = ', devicesList);

  const nameFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value, row }) => {
    return (
      <span>
        <Link to={`/device/${row.id}`}>{value}</Link>
      </span>
    );
  };

  const messageFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value, row }: any) => {
    return (
      <div>
        {value.map((el: any) => {
          return <div>{el.name}</div>;
        })}
      </div>
    );
  };

  const statusFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value, row }: any) => {
    return <span> {row.statusInfo.comment} </span>;
  };

  const palimpsestFormatterComponent: DataTypeProviderProps['formatterComponent'] = ({ value }: any) => {
    return <span> {value?.name} </span>;
  };

  const columns = useMemo(() => {
    return [
      {
        name: 'name',
        title: 'Устройство',
        width: 200,
      },
      // {
      //   name: 'configuration',
      //   title: 'Конфигурация',
      //   width: 200,
      //   headerClassName: styles['table-header'],
      // },
      {
        name: 'statusInfo',
        title: 'Статус',
        width: 300,
        headerClassName: styles['table-header'],
      },
      {
        name: 'palimpsest',
        title: 'Палимпсест',
        width: 200,
        headerClassName: styles['table-header'],
      },
      {
        name: 'messages',
        title: 'Сообщения',
        width: 300,
      },
    ];
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <HeaderPanel title="ТПИ / Устройства" />
        <Container>
          <div className={styles.content}>
            <div className={styles['content-item']}>
              <h2>Устройства</h2>
              <div>Тут описание страницы Тут описание страницы Тут описание страницы</div>
              <div>Тут описание страницы Тут описание страницы Тут описание страницы</div>
            </div>
            <div className={styles['content-item']}>
              <div>
                <TextField label="Строка поиска" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox color="primary" />} label="Показать все сообщения устройства" />
              </div>
            </div>
          </div>
          <div>
            <Table
              className={styles.table}
              columns={columns}
              dataTypeProviders={[
                {
                  for: ['name'],
                  formatterComponent: nameFormatterComponent,
                },
                {
                  for: ['messages'],
                  formatterComponent: messageFormatterComponent,
                },
                {
                  for: ['statusInfo'],
                  formatterComponent: statusFormatterComponent,
                },
                {
                  for: ['palimpsest'],
                  formatterComponent: palimpsestFormatterComponent,
                },
              ]}
              rows={devicesList || []}
            />
          </div>
        </Container>
      </div>
      <Dialog className={styles['dialog-container']} open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Сообщения устройства ТПИ-01</DialogTitle>
        <div className={styles.dialog}>
          <List>
            <ListItem>
              <ListItemText primary="Сообщение данного устройства номер 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Сообщение данного устройства номер 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Сообщение данного устройства номер 3" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Сообщение данного устройства номер 4" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Сообщение данного устройства номер 5" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    </>
  );
};
