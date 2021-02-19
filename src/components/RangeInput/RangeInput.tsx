import { TextField } from '@material-ui/core';
import React from 'react';
import cn from 'classnames';
import styles from './RangeInput.module.scss';

type Props = {
  label: string;
  className?: string;
  min?: number;
  max?: number;
  value?: any;
  onChange?: (event: any) => void;
  rowsMax?: any;
  name?: string;
};

export const RangeInput: React.FC<Props> = ({
  label,
  className,
  min = 0,
  max = 0,
  value,
  onChange,
  rowsMax,
}: Props) => {
  return (
    <TextField
      label={label}
      type="range"
      name="name"
      className={cn(styles.range, className)}
      InputProps={{ inputProps: { min, max } }}
      value={value}
      onChange={onChange}
      rowsMax={rowsMax}
    />
  );
};
