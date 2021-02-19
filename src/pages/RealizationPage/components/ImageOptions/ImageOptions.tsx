import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { RangeInput } from '../../../../components/RangeInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ImageOptions.module.scss';
import { TreeNode } from '../TreeRealization/TreeRealization';
import { putImageRequest } from '../../../../api/images';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    minWidth: '40%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface IProps {
  node: TreeNode;
  onChange: (node: any) => void;
}

export const ImageOptions: React.FC<IProps> = ({ onChange, node }) => {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<any>(null);

  const [alignment, setAlignment] = useState(node.value?.alignment || 'LEFT');
  const [horizontalMargin, setHorizontalMargin] = useState(node.value?.horizontalMargin || 0);
  const [imageId, setImageId] = useState(node.value?.imageId || undefined);
  const [scale, setScale] = useState(node.value?.scale || 0);
  const [verticalMargin, setVerticalMargin] = useState(node.value?.verticalMargin || 0);
  const [width, setWidth] = useState(node.value?.width || 0);

  useEffect(() => {
    const loadFile = async () => {
      const response = await putImageRequest(imageFile);
      console.log(response);
    }

    loadFile();
  }, [imageFile]);



  useEffect(() => {

    onChange({
      ...node,
      value: {
        alignment,
        horizontalMargin,
        imageId,
        scale,
        verticalMargin,
        width
      }
    });
  }, [
    alignment,
    horizontalMargin,
    imageId,
    scale,
    verticalMargin,
    width
  ]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    switch (name) {
      case 'scale':
        setScale(value);
        return;
      case 'alignment':
        setAlignment(value);
        return;
      case 'horizontalMargin':
        setHorizontalMargin(value);
        return;
      case 'verticalMargin':
        setVerticalMargin(value);
        return;
      case 'width':
        setWidth(value);
        return;
      default:
        return;
    }
  }

  return (
    <div>
      <div className={styles.title}>{node?.parent?.name} / Картинка</div>
      <div className={styles.main}>
        <div className={styles.fields}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel >Выравнивание</InputLabel>
              <Select
                value={alignment}
                name="alignment"
                onChange={handleInputChange}
              >
                <MenuItem value={'LEFT'}>По левому краю</MenuItem>
                <MenuItem value={'RIGHT'}>По правому краю</MenuItem>
                <MenuItem value={'CENTER'}>По центру</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              className={styles.input}
              value={horizontalMargin}
              name="horizontalMargin"
              onChange={handleInputChange}
              label="Отступ сбоку"
            />
            <TextField
              className={styles.input}
              value={verticalMargin}
              name="verticalMargin"
              onChange={handleInputChange}
              label="Отступ сверху"
            />

            <TextField
              className={styles.input}
              value={width}
              name="width"
              onChange={handleInputChange}
              label="Ширина"
            />
          </div>
          <div>
            <RangeInput
              onChange={handleInputChange}
              name="scale"
              value={scale}
              label="Масштаб"
              className={styles.range}
              max={100}
            />
          </div>
        </div>
        <div className={styles['img-container']}>
          <div className={styles['img-header']}>
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
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
