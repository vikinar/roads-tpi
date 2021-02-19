import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Button
} from '@material-ui/core';
import styles from './externalSystems.module.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HeaderPanel } from '../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Column, Table } from '../../../components/Table/Table';
import { DeleteButton } from '../../../components/DeleteButton';
import { Add } from '@material-ui/icons';

import { ConfirmDialog } from '../../../components/ConfirmDialog';
import {
  deleteExternalSystemRequest,
  fetchExternalSystemListRequest,
} from '../../../store/modules/externalSystems/externalSystemsSlice';
import { ExternalSystem } from '../../../types/externalSystem';

export const ExternalSystemsPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const externalSystems = useSelector((state: RootState) => state.externalSystemList.data);

  const [itemToDelete, setItemToDelete] = useState<any>()
  const [data, setData] = useState<ExternalSystem[]>([])
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchExternalSystemListRequest())
  }, [dispatch])

  useMemo(():any => {
    setData(externalSystems.map((item: any) => ({
      ...item,
    })))
  },  [externalSystems]);

  const handleActionDialogClose = useCallback(() => {
    setIsActionDialogOpen(false);
  }, [isActionDialogOpen]);

  const handleActionDialogYes = useCallback(() => {
    const newRows = data.filter((row:any) => {
      return row.id !== itemToDelete
    });
    setData(newRows);
    setIsActionDialogOpen(false)
    dispatch(deleteExternalSystemRequest(itemToDelete));
  }, [itemToDelete, dispatch]);

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'id',
        title: 'ID',
        width:150,
      },
      {
        name: 'name',
        width: 300,
        title: 'Название',
      },
      {
        name: 'description',
        width: 620,
        title: 'Описание',
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
      for: ['id'],
      formatterComponent: ({ value, row } :any) => {
        return (
          <span>
           {value}
          </span>
        );
      },
    },
    {
      for: ['name'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            <Link to={`/settings/edit/external-system/${row.id}`}>{value}</Link>
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
  ]

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Настройки / Внешние системы" />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className={styles.content_inner}>
              <div className={styles.content_block}>
                <div className={styles.content_block_header}>
                  <h2 className={styles['description-title']}>Внешние системы</h2>
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
                  onClick = {() => history.push('/settings/add/external-system')}
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
