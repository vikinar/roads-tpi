import React from 'react';
import styles from './VideoItem.module.scss';

type Props = {
  name: string;
  imageSrc: string | undefined;
  date?: string;
  style?: any;
};

export const VideoItem: React.FC<Props> = ({ name, imageSrc, date, style }) => {
  return (
    <div style={style} className={styles.container}>
      <div className={styles.title}>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>{date}</div>
      </div>
      <div className={styles['img-container']}>
        <img className={styles.img} src={imageSrc} alt="" />
      </div>
    </div>
  );
};
