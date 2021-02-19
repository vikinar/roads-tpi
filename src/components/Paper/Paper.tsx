import React from 'react';
import cn from 'classnames';
import styles from './Paper.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Paper: React.FC<Props> = ({ children, className }: Props) => {
  return <div className={cn(styles.paper, className)}>{children}</div>;
};
