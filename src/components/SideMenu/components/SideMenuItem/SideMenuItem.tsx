import React, { useCallback, useState } from 'react';
import { ListItemText, ListItem, Collapse, List, Tooltip } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './SideMenuItem.module.scss';

type Props = {
  title?: string;
  onClick?: (
    title: string,
    params: {
      parentId?: string | number;
      id?: string | number;
    },
    other?: Object,
  ) => void;
  items?: Props[];
  path?: string;
  disabled?: boolean;
  className?: string;
  id?: string | number;
  parentId?: string | number;
  tooltip?: string;
  icon?: React.FC;
};

export const SideMenuItem: React.FC<Props> = ({
  title,
  items = [],
  onClick,
  disabled,
  path,
  className,
  id,
  parentId,
  tooltip,
  icon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => {
    if (items.length) {
      setIsOpen(!isOpen);
    }

    if (onClick && title) {
      onClick(
        title,
        {
          parentId,
          id,
        },
        props,
      );
    }
  }, [isOpen, onClick, items, title, parentId, id, props]);

  const HocComponent = tooltip ? Tooltip : React.Fragment;
  const IconComponent = icon || React.Fragment;
  const componentProps = tooltip ? { title: tooltip || '' } : {};

  return (
    <>
      <ListItem button disabled={disabled} onClick={handleClick}>
        {/* @ts-ignore */}
        <HocComponent {...componentProps}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            {path ? (
              <Link className={cn(styles.link, className)} to={path}>
                <IconComponent /> <ListItemText primary={title} />
              </Link>
            ) : (
              <>
                <IconComponent /> <ListItemText className={cn(className)} primary={title} />
              </>
            )}
            {items.length ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
          </div>
        </HocComponent>
      </ListItem>
      {items?.length ? (
        <Collapse in={isOpen} unmountOnExit timeout="auto">
          <List component="ul" className={styles.submenu}>
            {items.map(item => (
              <SideMenuItem parentId={id} className={cn(className)} onClick={onClick} key={item.title} {...item} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
