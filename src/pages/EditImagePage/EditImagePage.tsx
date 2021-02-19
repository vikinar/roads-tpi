import React from 'react';
import styles from './EditImagePage.module.scss';
import { HeaderPanel } from '../../components/HeaderPanel';
import { IconButton, Container, TextField, Button } from '@material-ui/core';
import { shtrafImg } from '../../assets/images';
import { Paper } from '../../components/Paper';

export const EditImagePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderPanel title="Библиотека изображений / Ограничение скорости 60" />
      <Container>
        <div className={styles.header}>
          <div className={styles['header-items']}>
            <div className={styles.item}> Переместить </div>
            <div className={styles.item}> Копировать </div>
            <div className={styles.item}> Удалить </div>
          </div>
        </div>
        {/* <div className={styles.form}> */}
        <Paper className={styles.form}>
          <TextField label="Название" className={styles.input} />
          <TextField label="Файл" className={styles.input} />
          <div className={styles['form-buttons']}>
            <div className={styles.btn}>
              <Button color="primary" variant="contained">
                Сохранить
              </Button>
            </div>
            <div className={styles.btn}>
              <Button variant="contained">Отменить</Button>
            </div>
          </div>
        </Paper>
        {/* </div> */}
        <div className={styles.description}>
          <div className={styles['description-text']}>Последнее изменение: 2020.11.28 20:00 (Смирнов Иван)</div>
          <div className={styles['description-text']}>Разрешение: 400 * 400 пикселей</div>
          <div className={styles['description-text']}>Формат: png</div>
          <div>
            <img className={styles.img} src={shtrafImg} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};
