import React, { useState } from 'react';
import { shtrafImg } from '../../assets/images';
import { Container, TextField } from '@material-ui/core';
import styles from './ImagePage.module.scss';
import { HeaderPanel } from '../../components/HeaderPanel';
import { ImageItem } from '../../components/ImageItem';
import { RangeInput } from '../../components/RangeInput';

const videoItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ImagePage: React.FC = () => {
  const [blockWidth, setBlockWidth] = useState(23);

  const handleBlockWidthChange = (event: any) => {
    setBlockWidth(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Библиотека изображений" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['header-items']}>
            <div className={styles.item}> Добавить </div>
            <div className={styles.item}> Параметры </div>
            <div className={styles.item}> Копировать </div>
            <div className={styles.item}> Удалить </div>
          </div>
          <div className={styles['header-addition']}>
            <div className={styles['addition-item']}>
              <TextField label="Строка поиска" />
            </div>
            <div>
              {/* <TextField
                value={blockWidth}
                onChange={handleBlockWidthChange}
                rowsMax={blockWidth}
                InputProps={{ inputProps: { min: 10, max: 100 } }}
                className={styles.range}
                type="range"
                label="Размер картинок"
              /> */}
              <RangeInput
                label="Размер картинок"
                value={blockWidth}
                onChange={handleBlockWidthChange}
                rowsMax={blockWidth}
                min={10}
                max={100}
              />
            </div>
          </div>
        </div>
        <div className={styles.images}>
          {videoItems.map(item => (
            <ImageItem
              key={item}
              className={styles['image-item']}
              style={{
                width: `${blockWidth}%`,
              }}
              name={`Смирнов Иван`}
              imageName="200*20.png"
              date="2020.11.28 17:23"
              imageSrc={shtrafImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
