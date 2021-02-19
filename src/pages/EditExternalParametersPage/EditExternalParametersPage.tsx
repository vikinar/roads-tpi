import React, {useMemo} from 'react';
import styles from './EditExternalParametersPage.module.scss';
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";
import {Table} from '../../components/Table';
import {AddButton} from '../../components/AddButton';
import {DeleteButton} from "../../components/DeleteButton";
import cn from "classnames";

export const EditExternalParametersPage: React.FC<any> = (props) => {
        const {
            group,
            onEditButtonClick,
            parameters,
            onRemoveGroup,
            onEditParameterClick,
            onSelectParameter,
            onRemoveParameter
        } = props;

        const handlSelectParameterClick = (id: number) => {
            onSelectParameter(id);
        }

        const handleRemoveParameter = (id: number) => {
            onRemoveParameter(id);
        }

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
                    name: 'testValue',
                    title: 'Тестовое значение',
                    headerClassName: styles['table-header'],
                },
                {
                    name: 'type',
                    title: 'Тип данных',
                    headerClassName: styles['table-header'],
                },
                {
                    name: 'lifeTime',
                    title: 'Время жизни',
                    headerClassName: styles['table-header'],
                },
                {
                    name: 'delete',
                    title: ' ',
                    width: 90,
                    headerClassName: styles['table-header'],
                }
            ];
        }, []);

        const dataTypeProviders: any = [
            {
                for: ['code'],
                formatterComponent: ({row}: any) => {
                    return <Link to={`/externalParameter/${row.id}`} className={styles.link}>{row.code}</Link>;
                },
            },
            {
                for: ['delete'],
                formatterComponent: (item: any) => {
                    return (
                        <DeleteButton
                            onClick={() => {
                                handleRemoveParameter(item.row.id)
                            }}
                        />
                    );
                },
            },
        ];

        return (
            <div className={cn(styles.wrapper, styles.wrapper__content)}>
                <div className={styles.header}>
                    <Button onClick={onEditButtonClick}>Редактировать группу</Button>
                    <Button onClick={() => onRemoveGroup()}>Удалить</Button>
                </div>

                <div className={styles.description}>
                    <h2 className={styles.description__title}>{group.code}</h2>
                    <p className={styles.description__text}>{group.description}</p>
                </div>

                <div className={styles.parameters}>
                    <h4 className={styles.parameters__title}>Параметры группы</h4>

                    <Table
                        className={styles.table_grid}
                        columns={columns}
                        rows={parameters}
                        dataTypeProviders={dataTypeProviders}
                    ></Table>

                    <div className={styles.description__button}>
                        <AddButton onClick={onEditParameterClick} title="Добавить параметр"/>
                    </div>
                </div>
            </div>
        );
    }
;
