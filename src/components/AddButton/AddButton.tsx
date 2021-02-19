import React from 'react';
import { Add } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import styles from './AddButton.module.scss';

type Props = {
  title: string;
  onClick?: () => void;
};

export const AddButton: React.FC<Props> = ({ title, onClick }: Props) => {
  return (
    <div className={styles.btn}>
      <Button onClick={onClick} startIcon={<Add />}>
        {' '}
        {title}{' '}
      </Button>
    </div>
  );
};
