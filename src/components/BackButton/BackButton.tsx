import React from 'react';
import { ArrowBack } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import styles from './BackButton.module.scss';

type Props = {
  title: string;
  onClick?: () => void;
};

export const BackButton: React.FC<Props> = ({ title, onClick }: Props) => {
  return (
    <div className={styles.btn}>
      <Button onClick={onClick} startIcon={<ArrowBack />}>
        {' '}
        {title}{' '}
      </Button>
    </div>
  );
};
