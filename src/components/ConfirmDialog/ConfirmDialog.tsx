import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React from 'react';
import styles from './ConfirmDialog.module.scss'

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onYesClick: () => void;
  onNoClick: () => void;
};

export const ConfirmDialog: React.FC<Props> = ({ title, isOpen, onClose, onYesClick, onNoClick }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions className={styles.btn_block}>
        <Button onClick={onYesClick} variant = {'contained'} color = {'primary'}>Да</Button>
        <Button onClick={onNoClick} variant = {'contained'} color = {'default'} >Нет</Button>
      </DialogActions>
    </Dialog>
  );
};
