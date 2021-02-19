import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HeaderPanel } from '../../components/HeaderPanel';
import { DataGrid } from '@material-ui/data-grid';
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl, InputLabel, Select, MenuItem, DialogActions, FormControlLabel, Checkbox
} from '@material-ui/core';
import { Column, Table } from '../../components/Table/Table';
import cn from 'classnames';
import { AddButton } from '../../components/AddButton';
import styles from './EditMessagePage.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DeleteButton } from '../../components/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMessageRequest,
  fetchMessageRequest, newMessageRequest,
  updateMessageRequest,
} from '../../store/modules/message/messageSlice';
import { getMessage } from '../../store/modules/message';
import { fetchExternalParametersGroupRequest } from '../../store/modules/externalParameters/externalParametersGroup/externalParametersGroupSlice';
import { RootState } from '../../store';
import { fetchExternalParametersByGroupId } from '../../store/modules/externalParameters/externalParameters/externalParametersSlice';
import { fetchExternalParameterByIdRequest } from '../../store/modules/externalParameters/externalParameter/externalParameterSlice';


export const EditMessagePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();

  const message = useSelector(getMessage);
  const groups = useSelector((state: RootState) => state.externalParameters.groups.data)
  const groupById = useSelector((state: RootState) => state.externalParametersByGroupId.data)
  const externalParameter = useSelector((state: RootState) => state.externalParameter.data)

  const initialParams = {
    groupId: '',
    param: ''
  }

  const [rows, setRows] = useState<any>([]);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isParamDialogOpen, setIsParamDialogOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [groupId, setGroupId] = useState<number>();
  const [groupValue, setGroupValue] = useState<any>(initialParams)
  const [params, setParams] = useState<any>([])
  const [paramId, setParamId] = useState<number>()
  const [alias, setAlias] = useState<any>(null);

  useEffect(() => {
    id && dispatch(fetchMessageRequest(id));
    dispatch(fetchExternalParametersGroupRequest())
  }, [dispatch]);

  useEffect(() => {
    groupId && dispatch(fetchExternalParametersByGroupId(groupId));
  }, [groupId, dispatch])

  useEffect(() => {
    if(id) {
      setRows(message?.externalParameters.map((row: any) => {
        return {
          ...row
        }
      }))
      setValue({...message, locked: message?.enable})
    } else {
      setRows([])
      setValue({
        locked: false,
        externalParameters: []
      })
    }
  }, [message])


  useEffect(() => {
    setParams(groupById);
  }, [groupById])

  useEffect(() => {
    paramId && dispatch(fetchExternalParameterByIdRequest(paramId))
  }, [paramId, dispatch])

  useEffect(() => {
    externalParameter.id && setRows((prev:any) => ([
      ...prev,
      {
        alias: groupValue?.alias,
        id: externalParameter.id,
        groupId: externalParameter.group.id,
        groupCode: externalParameter.group.code,
        code: externalParameter.code,
        description: externalParameter.description,
        lifeTime: externalParameter.lifeTime,
        testValue: externalParameter.testValue
      }
    ]))

    externalParameter.id && setValue((prev:any) => prev ? ({
      ...prev,
      externalParameters: [
        ...rows,
        {
          alias: groupValue?.alias,
          id: externalParameter.id,
        }
      ]
    }) : ({
      ...prev,
      externalParameters: [
        {
          alias: groupValue?.alias,
          id: externalParameter.id,
        }
      ]
    }))
  }, [externalParameter, externalParameter.id])

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogYes = useCallback(() => {
    const newRows = rows.filter((row:any) => row.id !== rowToDelete);
    setRows(newRows);
    setIsDialogOpen(false);
  }, [rows, rowToDelete]);

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      locked: !e.target.checked
    }))
  }

  const handleSubmit = async () => {
    if(id){
      await dispatch(
          updateMessageRequest({...value, viewCondition: value.showCondition})
      )} else {
      await dispatch(
          newMessageRequest({...value, viewCondition: value.showCondition})
      )}
    history.push('/messages')
  }

  const handleGroupChange = (e:any) => {
    if(e.target.name === 'groupId') {
      setGroupId(e.target.value);
    }
    setGroupValue((prev:any) => ({
      ...prev,
      [e.target.name]: e.target.value,
      alias: e.target.value
    }))
  }

  const handleGroupSubmit = async () => {
    setParamId(groupValue.param)
    const filterParams = params?.parameters?.filter((item:any) => item.id !== groupValue.param)
    setIsParamDialogOpen(false)
  }

  return (
      <div className={styles.wrapper}>
        <HeaderPanel title={`ТПИ / Сообщения / ${value?.code || 'Новое'}`} />
        <Container className={styles.container}>
          <div className={styles.title}>{id ? 'Редактирование' : 'Добавление'} сообщения ТПИ</div>
          <div className={styles.block}>
            <div className={styles['block-content']}>
              <div className={styles['content-item']}>
                <div className={styles.field}>
                  <TextField variant={'outlined'} className={styles.input} name='code' value = {value?.code || ''} onChange={handleChange} label="Код" />
                </div>
                <div className={styles.field}>
                  <TextField variant={'outlined'} className={styles.input} name='priority' value={value?.priority || ''} onChange={handleChange} label="Приоритет" />
                </div>
              </div>
              <div className={styles['content-item']}>
                <div className={cn(styles.field, styles.field_description)}>
                  <TextField variant={'outlined'} className={styles.input} name='description' value={value?.description || ''} onChange={handleChange} label="Описание" />
                </div>
              </div>
            </div>
            <div className={cn(styles['block-content'], styles['block-content-single'])}>
              <TextField variant={'outlined'} className={styles.conditions} name = 'defaultDuration' value={value?.defaultDuration || ''} onChange={handleChange} multiline label="Длительность" />
            </div>
            <div className={cn(styles['block-content'], styles['block-content-single'])}>
              <TextField variant={'outlined'} className={styles.conditions} name = 'showCondition' value={value?.showCondition || ''} onChange={handleChange} multiline label="Условие отображения" />
            </div>
            <div className={styles['block-header__item']}>
              <FormControlLabel control={<Checkbox name='locked' value={value?.locked || false} onChange={handleChange} color="primary" />} label={value?.locked ? 'Выключено' : 'Включено'} />
            </div>

            <div className={styles['block-table']}>
              <div className={styles['table-title']}> Внешние параметры </div>
              <div className={styles.table}>
                <Table
                    className={styles.table_padding}
                    columns={[
                      {
                        name: 'groupCode',
                        title: 'Группа',
                        // headerClassName: styles['table-header'],
                        width: 200,
                      },
                      {
                        name: 'code',
                        title: 'Код',
                        // headerClassName: styles['table-header'],
                        width: 200,
                      },
                      {
                        name: 'description',
                        title: 'Описание',
                        // headerClassName: styles['table-header'],
                        width: 300,
                      },
                      {
                        name: 'alias',
                        title: 'Алиас',
                        // headerClassName: styles['table-header'],
                        width: 200,
                      },
                      {
                        name: 'delete',
                        title: ' ',
                        // headerName: '',
                        width: 200,
                        align: 'right'
                      },
                    ]}
                    dataTypeProviders = {[
                      {
                        for: ['groupCode'],
                        formatterComponent: ({ value, row }: any) => {
                          return (
                              <span>
                                {value}
                              </span>
                          );
                        },
                      },
                      {
                        for: ['code'],
                        formatterComponent: ({ value, row }: any) => {
                          return (
                              <span>
                                {value}
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
                        for: ['alias'],
                        formatterComponent: ({value, row}: any) => {
                          return <span>{value || groupValue?.alias}</span>
                        }
                      },
                      {
                        for: ['delete'],
                        formatterComponent: ({row}: any) => {
                          return (
                              <span>
                            <DeleteButton onClick={() => {
                              setRowToDelete(row.id);
                              setIsDialogOpen(true);
                            }}
                            />
                          </span>
                          );
                        }
                      },
                    ]}
                    rows={rows || []}
                />
              </div>
              <div>
                <AddButton onClick={() => setIsParamDialogOpen(true)} title="Добавить параметр" />
              </div>
            </div>
            <div className={styles['block-btn']}>
              <Button
                  onClick={handleSubmit}
                  className={styles.button}
                  variant="contained"
                  color="primary"
              >
                Сохранить
              </Button>
              <Button
                  onClick={() => {
                    history.push('/messages');
                  }}
                  className={styles.button}
                  variant="contained"
              >
                Отмена
              </Button>
            </div>
          </div>
        </Container>
        <Dialog open={isParamDialogOpen}>
          <DialogTitle>Внешние параметры</DialogTitle>
          <DialogContent className={styles.dialog}>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Выбрать группу</div>
              <FormControl className={styles.input}>
                <InputLabel className={styles.label} htmlFor="name-shared">Группа</InputLabel>
                <Select
                    value={groupValue?.groupId}
                    defaultValue={''}
                    onChange={handleGroupChange}
                    variant = {'outlined'}
                    inputProps={{
                      name: "groupId",
                      id: "groupId"
                    }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {groups.map((group:any) => (
                      <MenuItem key={"groupId" + group.id} value={group.id}>
                        {group.code}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Выбрать араметр</div>
              <FormControl className={styles.input}>
                <InputLabel className={styles.label} htmlFor="name-shared">Параметр</InputLabel>
                <Select
                    value={groupValue?.param || ''}
                    onChange={handleGroupChange}
                    variant = {'outlined'}
                    disabled={(!(groupId && groupById))}
                    inputProps={{
                      name: "param",
                      id: "param"
                    }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {params?.parameters?.map((group:any) => (
                      <MenuItem key={"groupId" + group.id} value={group.id}>
                        {group.code}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Алиас</div>
              <FormControl className={styles.input}>
                <TextField variant={'outlined'} disabled={!(params)} className={styles.input} name='alias' value={groupValue?.alias} onChange={handleGroupChange} label="Алиас" />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions className = {styles.btn_block}>
            <Button onClick={handleGroupSubmit} variant={'contained'} color = 'primary'>Добавить</Button>
            <Button onClick={() => setIsParamDialogOpen(false)}>Отмена</Button>
          </DialogActions>
        </Dialog>
        <ConfirmDialog
            onYesClick={handleDialogYes}
            onNoClick={handleDialogClose}
            title="Вы уверены, что хотите удалить параметр?"
            onClose={handleDialogClose}
            isOpen={isDialogOpen}
        />
      </div>
  );
};
