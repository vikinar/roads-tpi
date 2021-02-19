import React, { useState, useEffect } from 'react';
import styles from './PageOptions.module.scss';
import { ColorPicker } from '../../../../components/ColorPicker';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { MessageReleasePage } from '../../../../types/messageRealese';
import { putImageRequest } from '../../../../api/images';
import { TreeNode } from '../TreeRealization/TreeRealization';

type Props = {
  onDelete: () => void;
  onChange: (node: any) => void;
  node: TreeNode;
};

export const PageOptions: React.FC<Props> = ({ onDelete, node, onChange }) => {
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<any>(null);

  const [backgroundColor, setBackgroundColor] = useState(node.value?.backgroundColor || 'fff');

  useEffect(() => {
    onChange({
      ...node,
      value: {
        ...node.value,
        backgroundColor
      }
    })
  }, [backgroundColor]);

  useEffect(() => {
    const loadFile = async () => {
      const response = await putImageRequest(imageFile);
      console.log(response);
    }

    loadFile();
  }, [imageFile]);

  const handleColorChange = (color: string) => {
    setBackgroundColor(color.replace('#', ''));
  }

  return (
    <div>
      <div className={styles.title}>
        <span>{node?.name}</span>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </div>
      <div className={styles.main}>
        <div className={styles['color-container']}>
          <div className={styles['color-text']}>Цвет фона</div>
          <div className={styles['color-header']}>
            <ColorPicker hex={'#' + backgroundColor} onChange={handleColorChange} />
          </div>
        </div>
        <div className={styles['bg-container']}>
          <div className={styles['bg-header']}>
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Загрузить
              </Button>
            </label>
            <input
              style={{
                display: 'none',
              }}
              onChange={e => {
                e.preventDefault();

                let reader = new FileReader();
                // @ts-ignore
                let file = e.target.files[0];

                reader.onloadend = () => {
                  setImageFile(file);
                  setImageSrc(reader.result);
                };

                reader.readAsDataURL(file);
              }}
              type="file"
              id="file-upload"
            />
            <Button disabled variant="contained">
              Скачать
            </Button>
          </div>
          {imageSrc ? (
            <img
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
              }}
              className={styles.img}
              src={imageSrc}
              alt=""
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
