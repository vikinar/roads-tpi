import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List } from '@material-ui/core';
import React from 'react';
import styles from '../SideMenu/SideMenu.module.scss';
import { SideMenuItem } from '../SideMenu/components/SideMenuItem';

type Props = {
  title: string;
  list: [];
  onItemClick: () => void;
  isOpen: boolean
};

export const ChooseDialog: React.FC<Props> = ({ title,  list, onItemClick, isOpen}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List component="nav" disablePadding>
          {list?.map((item:any, index:number) => (
            <SideMenuItem key={item.index} className={styles['menu-item']} onClick={onItemClick} {...item} />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
