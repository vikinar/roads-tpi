import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { HeaderPanel } from '../../components/HeaderPanel';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CellParams, DataGrid } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import { AddButton } from '../../components/AddButton';
import { Button, Container } from '@material-ui/core';
import cn from 'classnames';
import styles from './MessagePage.module.scss';
import { BackButton } from '../../components/BackButton';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DeleteButton } from '../../components/DeleteButton';
import { fetchMessageRequest } from '../../store/modules/message';
import { getMessage, getMessageReleases } from '../../store/modules/message';
import { dateTimeNormalize } from '../../utils/dateTimeNormalize';
import { DialogAddRealization } from '../../components/DialogAddRealization';
import { fetchMessageConfigurationRequest } from '../../store/modules/messageConfigurations/messageConfigurationsSlice';
import { getMessageConfiguration } from '../../store/modules/messageConfigurations/messageConfigurationsSelector';
import { postMessageRealeseRequest } from '../../store/modules/messageRealese/messageRealeseSlice';
import { deleteTpiMessageRequest } from '../../store/modules/message/messageSlice';
import { MessageRealizationTable } from './components/MessageRealizationTable';
import { MessageRealizationImage } from './components/MessageRealizationImage';

export const MessagePage: React.FC = () => {
    const history = useHistory();
    const params: any = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessageRequest(params.id));
        dispatch(fetchMessageConfigurationRequest(params.id));
    }, [params.id, dispatch]);

    const message = useSelector(getMessage);
    const lastChange = message?.lastChange;

    const messageReleases = useSelector(getMessageReleases);
    const configurations = useSelector(getMessageConfiguration);

    const [isShowAddRealization, setIsShowAddRealization] = useState(false);

    const [realizationRows, setRealizationRows] = useState(message?.releases || []);
    const [realese, setRealese] = useState<any>();
    const [parametersRows, setParametersRows] = useState(message?.externalParameters || []);
    const [deleteMode, setDeleteMode] = useState<'parameters' | 'realization' | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<any>(null);

    const handleYesClick = useCallback(() => {
        if (deleteMode === 'parameters') {
            const newRows = parametersRows.filter((row: any) => row.id !== rowToDelete);
            setParametersRows(newRows);
        }
        if (deleteMode === 'realization') {
            // dispatch(deleteMessageReleaseRequest(rowToDelete))
            // const newRows = realizationRows.filter(row => row.id !== rowToDelete);
            // setRealizationRows(newRows);
        }

        setIsDialogOpen(false);
    }, [deleteMode, realizationRows, parametersRows, rowToDelete]);

    const parametersColumns = useMemo(() => {
        return [
            {
                field: 'gruppa',
                headerName: 'Группа',
                width: 150,
                headerClassName: styles['table-header'],
            },
            {
                field: 'kod',
                headerName: 'Код',
                width: 150,
                headerClassName: styles['table-header'],
            },
            {
                field: 'description',
                headerName: 'Описание',
                width: 300,
                headerClassName: styles['table-header'],
            },
            {
                field: 'alias',
                headerName: 'Алиас',
                width: 100,
                headerClassName: styles['table-header'],
            },
            {
                field: 'time',
                headerName: 'Время жизни',
                width: 100,
                headerClassName: styles['table-header'],
            },
            {
                field: 'changes',
                headerName: 'Последнее изменение',
                width: 250,
                headerClassName: styles['table-header'],
            },
            {
                field: 'delete',
                headerName: '',
                headerClassName: styles['table-header'],
                renderCell: (params: CellParams) => {
                    return (
                        <span>
                            <DeleteButton
                                onClick={() => {
                                    setRowToDelete(params.row.id);
                                    setDeleteMode('parameters');
                                    setIsDialogOpen(true);
                                }}
                            />
                        </span>
                    );
                },
                renderHeader: () => <span></span>,
            },
        ];
    }, []);

    const handleDialogClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    const handleShowAddRealizationChange = () => {
        setIsShowAddRealization(true);
    }

    const dialogTitle = useMemo(() => {
        switch (deleteMode) {
            case 'parameters':
                return 'Вы уверены, что хотите удалить параметр?';
            case 'realization':
                return 'Вы уверены, что хотите удалить реализацию?';
            default:
                return '';
        }
    }, [deleteMode]);

    const handleConfigurationIdChange = (configurationId: number) => {
        dispatch(postMessageRealeseRequest({
            configurationId,
            messageId: params.id,
            locked: true,
            pages: [
                {
                    backgroundColor: 'fff',
                    id: 0,
                    textLines: []
                }
            ]
        }));


        handleConfigurationClose();
    }

    const handleConfigurationClose = () => {
        setIsShowAddRealization(false);
    }

    const handleChangeConfiguration = (data: any) => {
        setRealese(data);
    }

    const handleDeleteRelizationClick = (id: number) => {
        dispatch(deleteTpiMessageRequest(id));
    }

    return (
        <div className={styles.wrapper}>
            <HeaderPanel title={'ТПИ / Сообщения / ' + (message ? message.code : '')} />

            <Container className={styles.container}>
                <div className={styles.top}>
                    <div>
                        <BackButton
                            onClick={() => {
                                history.push('/messages');
                            }}
                            title="Назад"
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                history.push(`/edit/message/${params.id}`);
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Редактировать
                        </Button>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.info}>
                        {
                            message && <div className={styles.description}>
                                <div className={styles['description-title']}>{message.code}</div>
                                <div className={styles['description-text']}>
                                    <div> {message.description} </div>
                                    <div> Статус: {message.enable ? 'Включено' : 'Выключен'}</div>
                                    <div> Приоритет: {message.priority}</div>
                                    {lastChange && <div> Последнее
                                        изменение: {dateTimeNormalize(lastChange.dateTime)} - {lastChange.user?.fullName}</div>}
                                </div>
                            </div>
                        }
                        <div>
                            <div className={styles['description-title']}> Условие отображения</div>
                            <div className={styles.text}> {message?.showCondition}</div>
                        </div>
                    </div>
                    <div className={styles.realization}>
                        <div className={styles['table-title']}>Реализация</div>
                        <div className={styles.info}>
                            <div className={styles.table}>
                                <MessageRealizationTable
                                    onConfigurationChange={handleChangeConfiguration}
                                    messageReleases={messageReleases} 
                                />
                                <div className={styles['add-icon']}>
                                    <AddButton
                                        onClick={handleShowAddRealizationChange}
                                        title="Добавить реализацию"
                                    />
                                </div>
                            </div>

                            {
                                realese && (
                                    <div
                                        style={{
                                            marginLeft: 20,
                                            display: 'block',
                                        }}
                                    >
                                        <div className={styles['change-content']}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={!realese || !realese.id}
                                                onClick={() => {
                                                    history.push(`/realization/${realese.id}/${params.id}`);
                                                }}
                                            >
                                                Редактировать
                                    </Button>
                                            <div>
                                                <Button
                                                    onClick={() => handleDeleteRelizationClick(realese.id)}
                                                ><Delete /></Button>
                                            </div>
                                        </div>
                                        <div className={styles['change-block']}>
                                            <MessageRealizationImage imageId={realese.imageId} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div>
                        <div className={styles['table-title']}>Внешние параметры</div>
                        <div className={cn(styles['table-grid'], styles['table-settings'])}>
                            <DataGrid hideFooter autoHeight columns={parametersColumns} rows={parametersRows} />
                        </div>
                        <div>
                            <AddButton title="Добавить параметр" />
                        </div>
                    </div>
                </div>
            </Container>
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onNoClick={handleDialogClose}
                title={dialogTitle}
                onYesClick={handleYesClick}
            />

            {
                isShowAddRealization && <DialogAddRealization
                    configurations={configurations}
                    onSuccess={handleConfigurationIdChange}
                    onCancel={handleConfigurationClose}
                    isOpen={isShowAddRealization}
                />
            }
        </div>
    );
};
