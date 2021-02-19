import { IconButton } from '@material-ui/core';
import { CellParams } from '@material-ui/data-grid';
import { ArrowBack, ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { DeleteButton } from '../../../../components/DeleteButton';
import { Table } from "../../../../components/Table";
import styles from './TableMessages.module.scss';

export const TableMessages: React.FC<any> = (props: any) => {
    const dataTypeProviders: any = [
        {
            for: ['duration'],
            formatterComponent: ({ row }: any) => {
                return <span>{row.duration} сек</ span>;
            },
        },
        {
            for: ['enable'],
            formatterComponent: ({ row }: any) => {
                return (
                    <span>{row.enable ? 'включено' : 'выключено'}</span>
                );
            },
        },
        {
            for: ['delete'],
            formatterComponent: ({ row }: any) => {
                return (
                    <span>
                        <DeleteButton
                            onClick={() => {
                            }}
                        />
                    </span>
                );
            },
        },
        {
            for: ['top'],
            formatterComponent: ({ row }: any) => {
                return (
                    <span>
                        <IconButton>
                            <ArrowUpward />
                        </IconButton>
                    </span >
                );
            },
        },
        {
            for: ['bottom'],
            formatterComponent: ({ row }: any) => {
                return (
                    <span>
                        <IconButton>
                            <ArrowDownward />
                        </IconButton>
                    </span >
                );
            },
        },
    ];

    const columns = useMemo(() => {
        return [
            {
                name: 'code',
                title: 'Код',
                headerClassName: styles['table-header'],
            },
            {
                name: 'description',
                title: 'Описание',
                headerClassName: styles['table-header'],
            },
            {
                name: 'enable',
                title: 'Статус',
                headerClassName: styles['table-header'],
            },
            {
                name: 'duration',
                title: 'Длительность',
                headerClassName: styles['table-header'],
            },
            {
                name: 'top',
                title: ' ',
                headerClassName: styles['table-header'],
                renderCell: (params: CellParams) => {
                    return (
                        <span>
                            <DeleteButton
                                onClick={() => {
                                }}
                            />
                        </span>
                    );
                },
                renderHeader: () => <span></span>
            },
            {
                name: 'bottom',
                title: ' ',
                headerClassName: styles['table-header'],
                renderCell: (params: CellParams) => {
                    return (
                        <span>
                            <IconButton>
                                <ArrowBack />
                            </IconButton>
                        </span>
                    );
                },
                renderHeader: () => <span></span>
            },
            {
                name: 'delete',
                title: ' ',
                headerClassName: styles['table-header'],
                renderCell: (params: CellParams) => {
                    return (
                        <span>
                            <DeleteButton
                                onClick={() => {
                                }}
                            />
                        </span>
                    );
                },
                renderHeader: () => <span></span>,
            },
        ];
    }, []);

    return (
        <Table
            dataTypeProviders={dataTypeProviders}
            className={styles.table_grid}
            columns={columns}
            rows={props.messages || []}
        ></Table>
    );
}