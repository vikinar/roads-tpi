import cn from "classnames";
import styles from "./SideBarMenuParameters.module.scss";
import { List } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import { SideMenuItem } from "../SideMenu/components";
import { AddButton } from "../AddButton";
import React from "react";
// @ts-ignore
import ResizePanel from 'react-resize-panel';
import { BackButton } from "../BackButton";

export const SideBarMenuParameters = (props: any) => {
    const history = useHistory();
    const params = useParams<any>();
    const parameterId = params.parameterId && Number(params.parameterId);
    const groupId = params.id && Number(params.id);
    const { groups, group } = props;
    const selectedGroup = group && group.group;

    const handleAddParameter = () => {
        props.onAddParameter();
    }

    return (
        <div className={styles.wrapper_inner}>
            <ResizePanel direction='e'>
                <div className={cn(styles.list, 'header', 'panel')}>
                    {selectedGroup && <div className={styles.prev_button}>
                        <BackButton
                            onClick={() => {
                                history.push('/externalParameters/' + selectedGroup.id);
                            }}
                            title="Назад"
                        />
                    </div>}

                    <div className={styles.list_title} style={{ marginBottom: '5px' }}>
                        {selectedGroup ? 'Группа параметров' : 'Выберите группу'}
                    </div>
                    <List component='nav' disablePadding>
                        {
                            !group && groups.map((item: any) => (
                                <Link
                                    className={styles.menu_link}
                                    to={`/externalParameters/${item.id}`
                                    }>
                                    <SideMenuItem
                                        key={item.id}
                                        title={item.code}
                                        className={cn(styles.menu_item, (groupId === item.id) ? styles.menu_item_selected : '')}
                                    />
                                </Link>
                            ))
                        }
                        {
                            selectedGroup &&
                            <Link className={styles.menu_link} to={`/externalParameters/${selectedGroup.id}`}>
                                <SideMenuItem
                                    key={selectedGroup.id}
                                    title={selectedGroup.code}
                                    className={cn(styles.menu_item, styles.menu_item_selected)}
                                />
                            </Link>
                        }
                    </List>
                    {!selectedGroup && <AddButton onClick={props.openDialogGroupEdit} title='Добавить' />}

                    {selectedGroup && <div className={styles.list_block}>
                        <div className={styles.list_title}>Выберите параметр</div>

                        <List component='nav' disablePadding>
                            {
                                group.parameters.map((item: any) => (
                                    <Link className={styles.menu_link} to={`/externalParameter/${item.id}`}>
                                        <SideMenuItem
                                            key={item.id}
                                            title={item.code}
                                            className={cn(styles.menu_item, (parameterId === item.id) ? styles.menu_item_selected : '')}
                                        />
                                    </Link>
                                ))
                            }
                        </List>
                        <AddButton onClick={handleAddParameter} title='Добавить параметр' />
                    </div>}
                </div>
            </ResizePanel>
        </div >
    )
}
