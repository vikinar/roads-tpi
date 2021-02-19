import React from 'react';
import styles from './ImageItem.module.scss';
import cn from 'classnames';

type Props = {
  name: string;
  imageSrc: string;
  date: string;
  style?: any;
  imageName: string;
  className?: string;
};

export const ImageItem: React.FC<Props> = ({ name, imageSrc, date, style, imageName, className }) => {
  return (
    <div style={style} className={cn(styles.container, className)}>
      <div className={styles.title}>
        <div className={styles['img-container']}>
          <img className={styles.img} src={imageSrc} alt="" />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles['img-name']}>{imageName}</div>
      </div>
    </div>
  );
};
