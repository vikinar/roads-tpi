import React from 'react';
import { Add, Delete } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import styles from './DeleteButton.module.scss';

type Props = {
  onClick?: () => void;
};

export const DeleteButton: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <div className={styles.btn}>
      <IconButton onClick={onClick}>
        <Delete />
      </IconButton>
    </div>
  );
};
