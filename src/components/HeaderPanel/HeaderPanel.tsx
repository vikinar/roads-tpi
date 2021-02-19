import React, { useState, useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';
import { DrawerPanel } from '../DrawerPanel';
import cn from 'classnames';
import styles from './HeaderPanel.module.scss';

type Props = {
  title: string;
  onClose?: () => void;
  className?: string;
  size?: 'big' | 'small';
  handle?: boolean
};

export const HeaderPanel: React.FC<Props> = ({ title, className, onClose, size = 'big', handle = true }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => handle && setIsOpen(!isOpen), [isOpen]);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className={cn(styles.container, className)}>
        <div className={styles.info}>
          <IconButton className={styles['button-icon']} onClick={handleClick}>
            <Menu className={cn(styles.icon, styles.icon_burger, styles[`icon_${size}`])} />
          </IconButton>
          {/* <ViewHeadline fontSize="large" className={styles.icon} /> */}
          <span className={cn(styles.title, styles[`title_${size}`])}>{title}</span>
        </div>
        {onClose ? (
          <IconButton className={styles['button-icon']} onClick={onClose}>
            <Close className={styles.icon} />
          </IconButton>
        ) : null}
      </div>
      <DrawerPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
