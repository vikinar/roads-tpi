import React, { useState } from 'react';
import cn from 'classnames';
import styles from './DecorationBox.module.scss';

type Props = {
  char: string;
  onClick: (state: boolean) => void;
  selected?: boolean;
};

export const DecorationBox: React.FC<Props> = ({ 
  char, onClick, selected
}) => {
  const [isActive, setIsActive] = useState(Boolean(selected));

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(!isActive);
  }

  return (
    <div
      onClick={handleClick}
      className={cn(styles.box, {
        [styles['box_active']]: isActive,
      })}
    >
      {char}
    </div>
  );
};
