import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {HeaderPanel} from '../../components/HeaderPanel';
import {Add} from '@material-ui/icons';
import {Button, Input} from '@material-ui/core';
import styles from './MessagesPage.module.scss';
import {Link, useHistory} from 'react-router-dom';
import {ConfirmDialog} from '../../components/ConfirmDialog';
import {DeleteButton} from '../../components/DeleteButton';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessagesListRequest} from '../../store/modules/messagesList';
import {Table} from '../../components/Table';
import {DataTypeProviderProps} from '@devexpress/dx-react-grid';
import {Column} from '../../components/Table/Table';
import {RootState} from '../../store';
import {deleteMessageRequest} from '../../store/modules/message/messageSlice';
import {dateTimeNormalize} from '../../utils/dateTimeNormalize';

export const MessagesPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessagesListRequest());
    }, []);

    const messages = useSelector((state: RootState) => state.messages.data);

    const [rows, setRows] = useState<any>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<any>(null);

    useMemo(() => {
        setRows(messages.map(row => {
            return {
                ...row,
                lastChange: {
                    ...row.lastChange,
                }
            }
        }))
    }, [messages])


    const handleDialogClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    const columns: Column[] = useMemo(() => {
        return [
            {
                name: 'code',
                title: 'Код',
                width: 150,
            },
            {
                name: 'description',
                width: 200,
                title: 'Описание',
            },
            {
                name: 'enable',
                width: 200,
                title: 'Статус',
            },
            {
                name: 'priority',
                title: 'Приоритет',
                width: 150,
            },
            {
                name: 'externalParametersCount',
                title: 'Внешние параметры',
                width: 200,
            },
            {
                name: 'lastChange',
                title: 'Последнее изменение',
                width: 530,
            },
            {
                name: 'delete',
                title: ' ',
                width: 90,
                align: 'right',
            },
        ];
    }, []);

    const handleDialogYes = useCallback(() => {
        const newRows = rows.filter((row: any) => {
            return row.id !== rowToDelete
        });
        setRows(newRows);
        setIsDialogOpen(false);
        dispatch(deleteMessageRequest(rowToDelete));
    }, [rowToDelete, dispatch]);

    const enableComponent: DataTypeProviderProps['formatterComponent'] = ({value}) => {
        return <span>{value ? 'Выполнено' : 'Не выполнено'}</span>;
    };

    return (
        <div className={styles.messages}>
            <HeaderPanel title="ТПИ / Сообщения"/>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div>
                        <div className={styles.title}>Сообщения ТПИ</div>
                        <div className={styles.description}>Тут описание страницы</div>
                    </div>
                    <div>
                        <Input placeholder="Строка поиска"/>
                    </div>
                </div>
                <div className={styles.table}>
                    <Table
                        columns={columns}
                        className={styles.table_padding}
                        dataTypeProviders={[
                            {
                                for: ['enable'],
                                formatterComponent: enableComponent,
                            },
                            {
                                for: ['delete'],
                                formatterComponent: ({row}) => {
                                    return (
                                        <DeleteButton
                                            onClick={() => {
                                                setRowToDelete(row.id);
                                                setIsDialogOpen(true);
                                            }}
                                        />
                                    );
                                },
                            },
                            {
                                for: ['lastChange'],
                                formatterComponent: ({value, row}) => {
                                    return (
                                        <span>
                                            {dateTimeNormalize(value.dateTime)} - {value.user.fullName}
                                        </span>
                                    );
                                },
                            },
                            {
                                for: ['code'],
                                formatterComponent: ({value, row}) => {
                                    return (
                                        <span>
                                            <Link to={`/message/${row.id}`}>{value}</Link>
                                        </span>
                                    );
                                },
                            },
                        ]}
                        rows={rows || []}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => {
                            history.push('/add/message');
                        }}
                        startIcon={<Add/>}
                    >
                        Добавить сообщение
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onYesClick={handleDialogYes}
                onNoClick={handleDialogClose}
                title="Вы уверены, что хотите удалить сообщение?"
            />
        </div>
    );
};
