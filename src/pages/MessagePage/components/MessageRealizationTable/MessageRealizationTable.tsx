import { CellParams } from '@material-ui/data-grid';
import React, { useMemo } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './MessageRealizationTable.module.scss';
import { DeleteButton } from '../../../../components/DeleteButton';
import { Table } from '../../../../components/Table';
import { dateTimeNormalize } from '../../../../utils/dateTimeNormalize';
import { MessageReleaseType } from '../../../../types/message';

type Props = {
    messageReleases: MessageReleaseType[];
    onConfigurationChange: (row: any) => void;
}

export const MessageRealizationTable: React.FC<Props> = (props: Props) => {
    const {messageReleases} = props;
    const history = useHistory();
    const params: any = useParams();
    const realizationColumns = useMemo(() => {
        return [
            {
                name: 'configuration',
                title: 'Конфигурация',
                width: 200,
                headerClassName: styles['table-header'],
            },
            {
                name: 'lastChange',
                title: 'Последнее изменение',
                width: 300,
                headerClassName: styles['table-header'],
            },
            {
                name: 'delete',
                title: ' ',
                headerClassName: styles['table-header'],
                renderCell: (params: CellParams) => {
                    return (
                        <span>
                            <DeleteButton
                                onClick={handleDeleteRowClick}
                            />
                        </span>
                    );
                },
                renderHeader: () => <span></span>,
            },
        ];
    }, []);

    const handleSelectRow = (row: any) => {
        history.push(`/realization/${row.id}/${params.id}`);
    }

    const handleChangeConfiguration = (row: any) => {
        props.onConfigurationChange(row);
    }

    const handleDeleteRowClick = () => {

    }

    return (
        <div className={styles['table-grid']}>
            <Table
                onClickRow={handleSelectRow}
                className={styles.anyone}
                columns={realizationColumns}
                dataTypeProviders={[
                    {
                        for: ['configuration'],
                        formatterComponent: (data: any) => {
                            return (
                                <Link onClick={(event: any) => {
                                    event.stopPropagation();
                                    handleChangeConfiguration(data.row);
                                }} to={'/message/' + params.id}>{data.value}</Link>
                            )
                        }
                    },
                    {
                        for: ['lastChange'],
                        formatterComponent: ({ value }) => {
                            return <span>{dateTimeNormalize(value.dateTime)}</span>;
                        },
                    },
                    {
                        for: ['delete'],
                        formatterComponent: ({ row }) => {
                            return (
                                <span>
                                    <DeleteButton
                                        onClick={handleDeleteRowClick}
                                    />
                                </span>
                            );
                        },
                    },
                ]}
                rows={messageReleases}
            />
        </div>
    )
}