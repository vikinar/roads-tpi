import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  List,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import styles from './Users.module.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HeaderPanel } from '../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Column, Table } from '../../../components/Table/Table';
import { DeleteButton } from '../../../components/DeleteButton';
import { Add } from '@material-ui/icons';

import { fetchUsersRequest } from '../../../store/modules/user';
import {
  deleteUserRequest,
  setPasswordRequest,
} from '../../../store/modules/user/usersSlice';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { InputDialog } from '../../../components/InputDialog/InputDialog';
import { UserType } from '../../../types/user';

export const UsersPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const users: UserType[] = useSelector((state: RootState) => state.userList.data);

  const [itemToDelete, setItemToDelete] = useState<any>()
  const [data, setData] = useState<UserType[]>([])
  const [password, setPassword] = useState<string>('')
  const [passwordId, setPasswordId] = useState<number>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchUsersRequest())
  }, [dispatch])

  useMemo(():any => {
    setData(users.map((item) => ({
      ...item,
      title: item?.name,
    })))
  },  [users]);

  const handleActionDialogYes = useCallback(() => {
    const newRows = data.filter((row) => {
      return row.id !== itemToDelete
    });
    setData(newRows);
    setIsActionDialogOpen(false)
    dispatch(deleteUserRequest(itemToDelete));
  }, [itemToDelete, dispatch]);

  const handleDialogYes = useCallback(async () => {
    await dispatch(setPasswordRequest({ id: passwordId, setPassword: password}));
    handleDialogClose();
  }, [passwordId, password, dispatch]);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, [isDialogOpen]);

  const handleActionDialogClose = useCallback(() => {
    setIsActionDialogOpen(false);
  }, [isActionDialogOpen]);

  const handlePasswordChange = (e:any) => {
    setPassword(() => (e.target.value))
  };

  const columns: Column[] = useMemo(() => {
    return [
      {
        name: 'login',
        title: 'Логин',
        width: 200,
      },
      {
        name: 'email',
        width: 250,
        title: 'Email',
      },
      {
        name: 'fullName',
        width: 350,
        title: 'ФИО',
      },
      {
        name: 'password',
        width: 250,
        title: ' ',
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
      for: ['login'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            <Link to={`/settings/edit/user/${row.id}`}>{value}</Link>
          </span>
        );
      },
    },
    {
      for: ['email'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span>
            {value}
          </span>
        );
      },
    },
    {
      for: ['password'],
      formatterComponent: ({ value, row }: any) => {
        return (
          <span
            className = {styles['set-password']}
            onClick={() => {
              setPasswordId(row.id)
              setIsDialogOpen(true)
            }}>
            Установить пароль
          </span>
        );
      },
    },
  ]

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Настройки / Пользователи" />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className = {styles.content_inner}>
              <div className={styles.content_block}>
                <div className={styles.content_block_header}>
                  <h2 className={styles['description-title']}>Пользователи</h2>
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
                  className={styles.table_btn}
                  onClick = {() => history.push('/settings/add/user')}
                >Добавить</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <InputDialog
        isOpen={isDialogOpen}
        type={'password'}
        onChangeValue={handlePasswordChange}
        onClose={handleDialogClose}
        onNoClick={handleDialogClose}
        onYesClick={handleDialogYes}
        title = 'Установить пароль'
      />
      <ConfirmDialog
        isOpen={isActionDialogOpen}
        onClose={handleActionDialogClose}
        onYesClick={handleActionDialogYes}
        onNoClick={handleActionDialogClose}
        title="Вы уверены, что хотите удалить пользователя?"
      />
    </div>
  );
};
