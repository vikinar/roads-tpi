import React from 'react';
import { Drawer } from '@material-ui/core';
import { List } from '@material-ui/core';
import { SideMenuItem } from '../SideMenu/components';
import styles from './DrawerPanel.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    title: 'Карта',
    path: '/map',
  },
  {
    title: 'ТПИ',
    items: [
      {
        title: 'Библиотека изображений',
        disabled: true,
      },
      {
        title: 'Внешние параметры',
        path: '/externalParameters',
      },
      {
        title: 'Сообщения',
        path: '/messages',
      },
      {
        title: 'Последовательности сообщений',
        path: '/sequecne'
      },
      {
        title: 'Календари запуска',
        disabled: true,
      },
      {
        title: 'Палимпсеты',
        disabled: true,
      },
      {
        title: 'Устройства',
        path: '/devices',
      },
      {
        title: 'Конфигурации',
        path: '/configurations',
      },
    ],
  },
  {
    title: 'Видеостена',
    path: '/video',
  },
  {
    title: 'Настройки',
    items: [
      {
        title: 'Посты',
        path: '/settings/posts',
      },
      {
        title: 'Группы постов',
        disabled: true,
      },
      {
        title: 'Устройства',
        path: '/settings/devices'
      },
      {
        title: 'Пользователи',
        path: '/settings/users'
      },
      {
        title: 'Группы пользователей',
        disabled: true,
      },
      {
        title: 'Внешние системы',
        path: '/settings/external-systems'
      },
    ],
  },
  {
    title: 'Моя учетная запись',
    disabled: true,
  },
];

export const DrawerPanel: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  return (
    <div>
      <Drawer
        PaperProps={{
          className: styles['drawer-item'],
        }}
        anchor="left"
        open={isOpen}
        onClose={onClose}
        className={styles.drawer}
      >
        <List component="nav" disablePadding>
          {menuItems.map(item => (
            <SideMenuItem className={styles['menu-item']} key={item.title} {...item} />
          ))}
        </List>
      </Drawer>
    </div>
  );
};
