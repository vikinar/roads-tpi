import { IconButton, TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './LineOptions.module.scss';
import { ColorPicker } from '../../../../components/ColorPicker';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { DecorationBox } from './components';
import { Delete } from '@material-ui/icons';
import { MessageReleaseFont, MessageReleasePageTextLine } from '../../../../types/messageRealese';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFontsRequest } from '../../../../store/modules/fonts/fontsSlice';
import { fontsSelector } from '../../../../store/modules/fonts/fonstSelector';
import { TreeNode } from '../TreeRealization/TreeRealization';

type Props = {
    onDelete: () => void;
    node: TreeNode;
    onChange: (data: any) => void;
};

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: '33%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const LineOptions: React.FC<Props> = ({
    onDelete,
    node,
    onChange
}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const fontsData = useSelector(fontsSelector);
    const [fonts, setFonts] = useState<MessageReleaseFont[]>([]);

    const [fontSize, setFontSize] = useState(node.value?.fontSize || 14);
    const [bold, setBold] = useState(node.value?.bold || false);
    const [italics, setItalics] = useState(node.value?.italics || false);
    const [lineHeight, setLineHeight] = useState(node.value?.lineHeight || 0);
    const [leftMargin, setLeftMargin] = useState(node.value?.leftMargin || 0);
    const [rightMargin, setRightMargin] = useState(node.value?.rightMargin || 0);
    const [verticalMargin, setVerticalMargin] = useState(node.value?.verticalMargin || 0);
    const [message, setMessage] = useState(node.value?.message || '');
    const [fontColor, setFontColor] = useState(node.value?.fontColor || 'fff');
    const [alignment, setAlignment] = useState(node.value?.alignment || 'LEFT');
    const [fontId, setFontId] = useState(node.value?.fontId || fonts[0]?.id);

    useEffect(() => {
        onChange({
            ...node,
            value: {
                fontSize,
                bold,
                italics,
                id: node.value?.id,
                lineHeight,
                leftMargin,
                verticalMargin,
                message,
                fontColor,
                alignment,
                fontId,
                rightMargin
            }
        });
    }, [
        fontSize,
        bold,
        italics,
        lineHeight,
        leftMargin,
        verticalMargin,
        message,
        fontColor,
        alignment,
        fontId,
        rightMargin
    ]);

    useEffect(() => {
        fontsData && setFonts(fontsData);
    }, [fontsData]);

    useEffect(() => {
        dispatch(fetchFontsRequest());
    }, [dispatch]);

    const getTitle = useCallback(() => {
        const page = node?.parent?.parent?.name || '';
        return `${page} / Текст / ${node.name}`
    }, [node]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

        switch (name) {
            case 'fontSize':
                setFontSize(value);
                return;
            case 'alignment':
                setAlignment(value);
                return;
            case 'fontId':
                setFontId(value);
                return;
            case 'fontSize':
                setFontSize(value);
                return;
            case 'leftMargin':
                setLeftMargin(value);
                return;
            case 'rightMargin':
                setRightMargin(value);
                return;
            case 'verticalMargin':
                setVerticalMargin(value);
                return;
            case 'lineHeight':
                setLineHeight(value);
                return;
            case 'message':
                setMessage(value);
                return;
            default:
                return;
        }
    }

    const handleColorChange = (color: string) => {
        setFontColor(color.replace('#', ''));
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>{getTitle()}</span>
                <IconButton onClick={onDelete}>
                    <Delete />
                </IconButton>
            </div>
            <div className={styles.main}>
                <div className={styles.fields}>
                    <div className={styles.aligning}>
                        <TextField
                            label="Размер шрифта"
                            name="fontSize"
                            onChange={handleInputChange}
                            value={fontSize}
                            className={styles.input}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Шрифт</InputLabel>
                            <Select
                                value={fontId}
                                onChange={handleInputChange}
                                name="fontId"
                            >
                                {fonts.map((font) => (
                                    <MenuItem value={font.id}>{font.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Выравнивание</InputLabel>
                            <Select
                                value={alignment}
                                onChange={handleInputChange}
                                name="alignment"
                            >
                                <MenuItem value={'LEFT'}>По левому краю</MenuItem>
                                <MenuItem value={'RIGHT'}>По правому краю</MenuItem>
                                <MenuItem value={'CENTER'}>По центру</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Высота строки"
                            className={styles.input}
                            name="lineHeight"
                            value={lineHeight}
                            onChange={handleInputChange}
                        />

                        <TextField
                            label="Левый отступ"
                            className={styles.input}
                            onChange={handleInputChange}
                            name="leftMargin"
                            value={leftMargin}
                        />

                        <TextField
                            label="Правый отступ"
                            className={styles.input}
                            onChange={handleInputChange}
                            name="rightMargin"
                            value={rightMargin}
                        />

                        <TextField
                            label="Верхний отступ"
                            className={styles.input}
                            onChange={handleInputChange}
                            name="verticalMargin"
                            value={verticalMargin}
                        />
                    </div>
                    <div className={styles.decoration}>
                        <div>
                            <div className={styles['color-title']}>Цвет шрифта</div>
                            <ColorPicker hex={`#` + fontColor} onChange={handleColorChange} />
                        </div>
                        <DecorationBox
                            selected={bold}
                            char="Ж"
                            onClick={(value) => setBold(value)}
                        />
                        <DecorationBox
                            selected={italics}
                            char="К"
                            onClick={(value) => setItalics(value)}
                        />
                    </div>
                </div>
                <div>
                    <TextField
                        onChange={handleInputChange}
                        name="message"
                        value={message}
                        multiline={true}
                        className={styles.textarea}
                    />
                </div>
            </div>
        </div>
    );
};