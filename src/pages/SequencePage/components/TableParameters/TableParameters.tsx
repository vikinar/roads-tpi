import React, { useMemo } from 'react';
import { Table } from "../../../../components/Table";
import styles from './TableParameters.module.scss';

export const TableParameters: React.FC<any> = (props: any) => {
    const dataTypeProviders: any = [
        {
            for: ['group'],
            formatterComponent: ({ row }: any) => {
                return <span>{row.group.code}</ span>;
            },
        },
        {
            for: ['lifeTime'],
            formatterComponent: ({ row }: any) => {
                return (
                    <span>{row.lifeTime} мин</span>
                );
            },
        },
    ];

    const columns = useMemo(() => {
        return [
            {
                name: 'group',
                title: 'Группа',
                headerClassName: styles['table-header'],
            },
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
                name: 'lifeTime',
                title: 'Время жизни',
                headerClassName: styles['table-header'],
            },
        ];
    }, []);

    return (
        <Table
            dataTypeProviders={dataTypeProviders}
            className={styles.table_grid}
            columns={columns}
            rows={props.parameters || []}
        ></Table>
    );
}