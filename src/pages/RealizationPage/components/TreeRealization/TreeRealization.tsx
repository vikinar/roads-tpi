import { TreeView, TreeItem } from '@material-ui/lab';
import React, { useEffect, useMemo, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MessageReleaseFont, MessageReleasePage } from '../../../../types/messageRealese';
import styles from './TreeRealization.module.scss';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fontsSelector } from '../../../../store/modules/fonts/fonstSelector';
import { fetchFontsRequest } from '../../../../store/modules/fonts/fontsSlice';

type IProps = {
    pages: MessageReleasePage[];
    onClick: (node: TreeNode) => void;
    onChangeTree: (node: TreeNode) => void;
}

export class TreeNode {
    public value: any;
    public children: TreeNode[] = [];
    public parent: TreeNode | null = null;
    public id = '';
    public name = '';
    public type = '';

    constructor(props: any) {
        this.value = props.value;
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.children = [];
    }

    addChild(node: TreeNode) {
        if (!this.isNodeExist(node)) {
            node.setParent(this);
            this.children = [...this.children, node];
        }
    }

    removeChild(node: TreeNode) {
        this.children = this.children.filter(item => item.id !== node.id);
    }

    setParent(parent: TreeNode) {
        this.parent = parent;
    }

    getChildren(): TreeNode[] {
        return this.children;
    }

    isNodeExist(node: TreeNode) {
        return this.children.find(item => item.id === node.id);
    }
}

export const TreeRealization: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const { onClick, onChangeTree } = props;
    const propPages = props.pages;
    const [tree, setTree] = useState<TreeNode | null>();
    const [pages, setPages] = useState<MessageReleasePage[]>([]);
    const [update, setUpdate] = useState(true);
    const [fonts, setFonts] = useState<MessageReleaseFont[]>([]);
    const fontsData = useSelector(fontsSelector);

    useEffect(() => {
        fontsData && setFonts(fontsData);
    }, [fontsData]);

    useEffect(() => {
        dispatch(fetchFontsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (tree) {
            onChangeTree(tree);
        }
    }, [tree, update]);


    useEffect(() => {
        setPages(propPages);
    }, [propPages]);

    useEffect(() => {
        if (update) {
            setTree(new TreeNode({
                type: 'parent',
                name: 'parent'
            }));
            generationTreeInPage();
        }
    }, [pages, update]);

    const getTreeNodeId = (): string => {
        return String(Math.random());
    }

    const handleNodeClick = (node: TreeNode) => {
        if (tree) {
            onChangeTree(tree);
        }

        const nodeType = node.type;
        if (nodeType !== 'picture' && nodeType !== 'line' && nodeType !== 'page') {
            return;
        }

        onClick(node);
    }

    const handleAddTextLineInParentClick = (node: TreeNode | null) => {
        if (!node) {
            return;
        }
        setUpdate(true);
        const countLines = node.getChildren().filter(item => item.type === 'line').length;
        const getAddButtonNode = node.getChildren().find(node => node.type === 'addTextLine');

        if (getAddButtonNode) {
            node.removeChild(getAddButtonNode);
        }

        const lineTree = new TreeNode({
            name: 'Строка ' + (countLines + 1),
            value: {
                alignment: 'LEFT',
                bold: true,
                fontColor: 'ffffff',
                fontId: fonts[0]?.id,
                fontSize: 14,
                id: 0,
                italics: true,
                leftMargin: 0,
                lineHeight: 14,
                message: 'Сообщение',
                rightMargin: 0,
                verticalMargin: 0
            },
            id: getTreeNodeId(),
            type: 'line'
        });

        node.addChild(lineTree);

        node.addChild(new TreeNode({
            type: 'addTextLine',
            id: getTreeNodeId(),
            name: ''
        }));

        setTree(tree);
    }

    const handleAddPageInParentClick = (node: TreeNode | null) => {
        if (!node) {
            return;
        }
        setUpdate(true);
        const countLines = node.getChildren().filter(item => item.type === 'page').length;
        const getAddButtonNode = node.getChildren().find(node => node.type === 'addPage');

        if (getAddButtonNode) {
            node.removeChild(getAddButtonNode);
        }

        const lineTree = new TreeNode({
            name: 'Страница ' + (countLines + 1),
            value: {
                picture: {},
                textLines: [],
                backgroundColor: '000000',
                id: 0
            },
            id: 'Страница ' + (countLines + 1),
            type: 'page'
        });

        const nodeTextLines = new TreeNode({
            type: 'textLineBlock',
            id: getTreeNodeId(),
            name: 'Текст',
            value: {}
        });

        nodeTextLines.addChild(new TreeNode({
            type: 'addTextLine',
            id: getTreeNodeId(),
            name: ''
        }));

        lineTree.addChild(nodeTextLines);

        lineTree.addChild(new TreeNode({
            type: 'picture',
            id: getTreeNodeId(),
            value: {},
            name: 'Картинка'
        }));

        node.addChild(lineTree);

        node.addChild(new TreeNode({
            type: 'addPage',
            id: 'Добавить страницу',
            name: ''
        }));

        setTree(tree);
    }

    const generationTreeInPage = () => {
        if (pages.length === 0 || !tree) {
            return;
        }

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const nodePage = new TreeNode({
                name: 'Страница ' + (i + 1),
                id: 'Страница ' + (i + 1),
                type: 'page',
                value: page
            });

            const nodeTextLines = new TreeNode({
                type: 'textLineBlock',
                id: getTreeNodeId(),
                name: 'Текст',
                value: {}
            });

            if (page.textLines) {
                for (let j = 0; j < page.textLines.length; j++) {
                    const line = page.textLines[j];
                    const nodeLine = new TreeNode({
                        type: 'line',
                        value: line,
                        id: 'Строка ' + (j + 1),
                        name: 'Строка ' + (j + 1)
                    });
                    nodeTextLines.addChild(nodeLine);
                }

            }

            nodeTextLines.addChild(new TreeNode({
                type: 'addTextLine',
                id: getTreeNodeId(),
                name: ''
            }));

            nodePage.addChild(nodeTextLines);


            nodePage.addChild(new TreeNode({
                type: 'picture',
                id: getTreeNodeId(),
                value: page.picture || {},
                name: 'Картинка'
            }));

            tree.addChild(nodePage);
        }

        tree.addChild(new TreeNode({
            name: '',
            id: 'Добавить страницу',
            value: {},
            type: 'addPage'
        }));

        setTree(tree);
        setUpdate(false);
    };

    const getTemplateTreeItem = (node: TreeNode) => {
        if (node.type === 'addTextLine') {
            return (
                <TreeItem
                    className={styles.tree__item}
                    key={node.id}
                    icon={<Add />}
                    onClick={() => handleAddTextLineInParentClick(node.parent)}
                    nodeId={node.id} label={node.name}
                >{getChildrenTree(node)}</TreeItem >
            )
        }

        if (node.type === 'addPage') {
            return (
                <TreeItem
                    className={styles.tree__item}
                    key={node.id}
                    icon={<Add />}
                    onClick={() => handleAddPageInParentClick(node.parent)}
                    nodeId={node.id} label={node.name}
                >{getChildrenTree(node)}</TreeItem >
            )
        }

        return (
            <TreeItem
                onClick={() => handleNodeClick(node)}
                nodeId={node.id}
                label={node.name}
                key={node.id}
                className={styles.tree__item}
            >{getChildrenTree(node)}</TreeItem >
        )
    }

    const getChildrenTree = (parentNode: TreeNode) => {
        if (parentNode.getChildren().length === 0) {
            return null;
        }

        return parentNode.getChildren().map((node: TreeNode) => getTemplateTreeItem(node));
    }

    return (
        <TreeView
            multiSelect={true}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {(!update && tree) && getChildrenTree(tree)}
        </TreeView>
    );
}