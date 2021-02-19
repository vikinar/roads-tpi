import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, TextField } from '@material-ui/core';
import styles from '../../pages/settings/User/Users.module.scss';
import React from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  type?: string;
  onClose: () => void;
  onChangeValue: (arg:any) => void;
  onYesClick: () => void;
  onNoClick: () => void;
};

export const InputDialog: React.FC<Props> = ({ title, isOpen, type, onClose, onChangeValue, onYesClick, onNoClick }) => {

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={styles.dialog}>
        <List component="nav" disablePadding>
          <TextField
            variant={'outlined'}
            type = {type}
            className={styles.input} name='password' label="Пароль"
            onChange={onChangeValue}
          />
        </List>
      </DialogContent>
      <DialogActions className = {styles.btn_block}>
        <Button onClick={onYesClick}>Да</Button>
        <Button onClick={onNoClick}>Отмена</Button>
      </DialogActions>
    </Dialog>
  )
}
