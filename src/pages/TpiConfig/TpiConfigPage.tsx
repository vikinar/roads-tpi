import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Button
} from '@material-ui/core';
import styles from './TpiConfigPage.module.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HeaderPanel } from '../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Column, Table } from '../../components/Table/Table';
import { DeleteButton } from '../../components/DeleteButton';
import { Add } from '@material-ui/icons';
import { TpiConfig } from '../../types/tpiConfig';
import { deleteTpiConfigRequest, fetchTpiConfigListRequest } from '../../store/modules/tpiConfig/tpiConfig';
import {ConfirmDialog} from '../../components/ConfirmDialog';

export const TpiConfigPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const tpiConfigList = useSelector((state: RootState) => state.tpiConfigList.data);

  const [itemToDelete, setItemToDelete] = useState<any>()
  const [data, setData] = useState<TpiConfig[]>([])
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchTpiConfigListRequest())
  }, [dispatch])

  useMemo(():any => {
    setData(tpiConfigList.map((item: any) => ({
      ...item,
    })))
  },  [tpiConfigList]);

  const handleActionDialogClose = useCallback(() => {
    setIsActionDialogOpen(false);
  }, [isActionDialogOpen]);

  const handleActionDialogYes = useCallback(() => {
    const newRows = data.filter((row:any) => {
      return row.id !== itemToDelete
    });
    setData(newRows);
    setIsActionDialogOpen(false)
    dispatch(deleteTpiConfigRequest(itemToDelete));
  }, [itemToDelete, dispatch]);

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'name',
        title: 'Название',
        width :200,
      },
      {
        name: 'description',
        width: 300,
        title: 'Комментарий',
      },
      {
        name: 'width',
        width: 150,
        title: 'Ширина',
      },
      {
        name: 'height',
        width: 150,
        title: 'Высота',
      },
      {
        name: 'pageDurationMin',
        width: 280,
        title: 'Мин. длительность сообщения',
      },
      {
        name: 'delete',
        title: ' ',
        width: 90,
        align: 'right',
      },
    ];
  }, [data]);

  const dataTypeProviders = [
    {
      for: ['delete'],
      formatterComponent: ({ row }: any) => {
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
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            <Link to={`/configuration/edit/${row.id}`}>{value}</Link>
          </span>
        );
      },
    },
    {
      for: ['description'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            {value}
          </span>
        );
      },
    },
    {
      for: ['width'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            {value}
          </span>
        );
      },
    },
    {
      for: ['height'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            {value}
          </span>
        );
      },
    },
    {
      for: ['pageDurationMin'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            {value}
          </span>
        );
      },
    },
  ]

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="ТПИ / Конфигурации" />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className = {styles.content_inner}>
              <div className={styles.content_block}>
                <div className={styles.content_block_header}>
                  <h2 className={styles['description-title']}>Конфигурации ТПИ</h2>
                  <div className={styles['description-text']}>
                    <p>Тут описание страницы</p>
                  </div>
                </div>
                <Table
                  columns={columns}
                  className={styles.table_padding}
                  dataTypeProviders={dataTypeProviders}
                  rows={data || []}
                />
                <Button
                  startIcon={<Add />}
                  className={styles.list_btn}
                  onClick = {() => history.push('/configuration/add')}
                >Добавить</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <ConfirmDialog
        isOpen={isActionDialogOpen}
        onClose={handleActionDialogClose}
        onYesClick={handleActionDialogYes}
        onNoClick={handleActionDialogClose}
        title="Вы уверены, что хотите удалить пост?"
      />
    </div>
  );
};
