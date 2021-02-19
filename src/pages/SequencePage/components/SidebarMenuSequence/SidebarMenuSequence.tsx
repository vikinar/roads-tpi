import cn from "classnames";
import styles from "./SidebarMenuSequence.module.scss";
import { List } from "@material-ui/core";
import React from "react";
// @ts-ignore
import ResizePanel from 'react-resize-panel';
import { SideMenuItem } from "../../../../components/SideMenu/components";
import { AddButton } from "../../../../components/AddButton";
import { Link, useParams } from "react-router-dom";

export const SidebarMenuSequence: React.FC<any> = ({ sequenceList = [] }) => {
    const params: any = useParams();
    const sequenceId = params.id;
    return (
        <div className={styles.wrapper_inner}>
            <ResizePanel direction='e'>
                <div className={cn(styles.list, 'header', 'panel')}>
                    <div className={styles.list_title}>
                        Выберите последовательность
                    </div>
                    <List component='nav' disablePadding>
                        {
                            sequenceList.map((item: any) => (
                                <Link className={styles.menu_link} to={`/sequecne/${item.id}`}>
                                    <SideMenuItem
                                        key={item.id}
                                        title={item.code}
                                        className={cn(styles.menu_item, (Number(sequenceId) === Number(item.id)) ? styles.menu_item_selected : '')}
                                    /></Link>
                            ))
                        }
                    </List>
                    <AddButton title='Добавить' />
                </div>
            </ResizePanel>
        </div>
    )
}
