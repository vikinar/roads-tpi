import { Button, Container } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { HeaderPanel } from '../../components/HeaderPanel';
import { Paper } from '../../components/Paper';
import styles from './RealizationPage.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchMessageRealeseRequest, getMessageRealese } from '../../store/modules/messageRealese';
import { ImageOptions, LineOptions, PageOptions, TreeRealization } from './components';
import { MessageReleasePage } from '../../types/messageRealese';
import { TreeNode } from './components/TreeRealization/TreeRealization';
import { updateMessageRealeseRequest } from '../../store/modules/messageRealese/messageRealeseSlice';
import { postMessageRealeseImage } from '../../api/messages';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const RealizationPage: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // params
    const params: any = useParams();
    const realizationId = params.id;
    const messageId = params.messageId;
    const [tree, setTree] = useState<TreeNode | null>();
    const [update, setUpdate] = useState(false);
    const [image, setImage] = useState('');
    const [selectedIndexPage, setSelectedIndexPage] = useState<number>(0);
    const [error, setError] = useState<string>('');

    // Селекторы
    const realization = useSelector(getMessageRealese);

    useEffect(() => {
        if (tree && tree?.children.length > 0) {
            fetchRealizationImage();
        }
    }, [tree, update]);

    // Обработчики
    useEffect(() => {
        dispatch(fetchMessageRealeseRequest(realizationId));
    }, [realizationId, dispatch]);

    useEffect(() => {
        realization && setPages(realization.pages);
    }, [realization]);

    // Состояния
    const [pages, setPages] = useState<MessageReleasePage[]>([]);
    const [node, setNode] = useState<TreeNode | null>();

    // handlers
    const handleNodeSelect = (node: TreeNode) => {
        setNode(null);
        setTimeout(() => {
            setNode(node);

        }, 0);
    }

    const fetchRealizationImage = async () => {
        const response = await postMessageRealeseImage({
            configuration: realization?.configuration,
            page: parseTree()[0]
        });
        const encode = 'data:image/png;base64, ' + (response ? response.data : '');
        setImage(encode);
    }

    const handleNodeDelete = () => {
        if (node && node.parent) {
            node.parent.removeChild(node);
            setNode(null);
        }
    }

    const handleChangeTree = (node: TreeNode) => {
        setTree(node);
    }

    const handleNodeChange = (newNode: TreeNode) => {
        if (node) {
            setUpdate(true);
            node.value = newNode.value;

            if (tree && tree?.children.length > 0) {
                fetchRealizationImage();
            }
        }
    }

    const handleSaveClick = () => {
        const data = {
            configurationId: realization?.configuration?.id,
            locked: true,
            messageId: Number(messageId),
            pages: parseTree(),
            realizationId
        };

        dispatch(updateMessageRealeseRequest(data));
    }

    const configuration = realization?.configuration || {
        width: 200,
        height: 300
    };

    const parseTree = (): MessageReleasePage[] => {
        const childrenTree = tree?.getChildren() || [];

        return childrenTree.reduce((acc: any[], item: any) => {
            if (item.type === 'page') {
                const value: any = item.value;
                const textLineBlock = item.children.find((i: any) => i.type === "textLineBlock");
                const textLines: any[] = textLineBlock?.getChildren().filter((item: any) => item.type === 'line').map((item: any) => item.value) || [];
                const pictureBlock = item.children.find((i: any) => i.type === 'picture');
                if (!pictureBlock || !pictureBlock.value?.imageId) {
                    return [
                        ...acc,
                        {
                            backgroundColor: value.backgroundColor,
                            backgroundImageId: value.backgroundImageId,
                            id: value.id || 0,
                            textLines
                        }
                    ];
                } else {
                    return [
                        ...acc,
                        {
                            backgroundColor: value.backgroundColor,
                            backgroundImageId: value.backgroundImageId,
                            id: value.id || 0,
                            textLines,
                            picture: pictureBlock.value
                        }
                    ];
                }
            }

            return acc;
        }, []);
    }

    return (
        <div className={styles.wrapper}>
            <HeaderPanel title="ТПИ / Сообщения / Гололед / Реализация" />
            <Container className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <BackButton
                            onClick={() => {
                                history.push('/message/' + messageId);
                            }}
                            title="Назад"
                        />
                    </div>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSaveClick}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles['options-container']}>
                        <Paper className={styles.menu}>
                            <TreeRealization
                                pages={pages}
                                onClick={handleNodeSelect}
                                onChangeTree={handleChangeTree}
                            />
                        </Paper>

                        <Paper className={styles.options}>
                            {
                                (node && node.type === 'page') && <PageOptions onDelete={handleNodeDelete} node={node} onChange={handleNodeChange} />
                            }

                            {
                                (node && node.type === 'line') && <LineOptions node={node} onDelete={handleNodeDelete} onChange={handleNodeChange} />
                            }
                            {
                                (node && node.type === 'picture') && <ImageOptions node={node} onChange={handleNodeChange} />
                            }
                        </Paper>
                    </div>

                    <Paper className={styles.demo}>
                        {image && <img src={image} alt="" style={{
                            width:
                                configuration.width + 'px',
                            height: configuration.height + 'px'
                        }} />}
                    </Paper>
                </div>
            </Container>


            {/* <ConfirmDialog isOpen={Boolean(error)} title={`Ошибка: ${error}`} /> */}
        </div>
    );
};
