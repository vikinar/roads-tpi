import React, { useEffect, useState } from 'react';
import { HeaderPanel } from '../../components/HeaderPanel';
import { SidebarMenuSequence } from './components/SidebarMenuSequence';
import styles from './SequencePage.module.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchSequencesListRequest } from '../../store/modules/sequenceList/sequenceListSlice';
import { fetchSequenceRequest } from '../../store/modules/sequence/sequenceSlice';
import { getSequenceListSelector } from '../../store/modules/sequenceList/sequenceListSelector';
import { getSequenceSelector } from '../../store/modules/sequence/sequenceSelector';
import { dateTimeNormalize } from '../../utils/dateTimeNormalize';
import { TableParameters } from './components/TableParameters';
import { TableMessages } from './components/TableMessages';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const SequencePage: React.FC = () => {
    const history = useHistory();
    const params: any = useParams();
    const sequenceId = params.id;
    const dispatch = useDispatch();

    const sequenceList = useSelector(getSequenceListSelector);
    const sequence: any = useSelector(getSequenceSelector);
    const [isOpennedDialogDelete, setIsOpennedDialogDelete] = useState(false);

    useEffect(() => {
        dispatch(fetchSequencesListRequest())
    }, []);

    useEffect(() => {
        sequenceId && dispatch(fetchSequenceRequest(sequenceId));
    }, [sequenceId]);

    const handleDialogClose = () => {
        setIsOpennedDialogDelete(false);
    }

    const handleDialogDeleteOpen = () => {
        setIsOpennedDialogDelete(true);
    }

    const handleDialogYes = () => {
        history.push('/sequecne');
        handleDialogClose();
    }

    return (
        <div className={styles.wrapper}>
            <HeaderPanel title={'ТПИ / Последовательности сообщений ' + (sequence ? ` / ${sequence.code}` : '')} />
            <div className={styles.wrapper_inner}>
                <SidebarMenuSequence sequenceList={sequenceList} />

                {
                    (sequence && sequenceId) && (
                        <div className={cn(styles.wrapper, styles.wrapper__content)}>
                            <div className={styles.header}>
                                <Button disabled={true} color="default">Редактироать последовательность</Button>
                                <Button onClick={handleDialogDeleteOpen}>Удалить</Button>
                            </div>
                            <div className={styles.description}>
                                <h2 className={styles.description__title}>{sequence.code}</h2>
                                <p className={styles.description__text}>{sequence.description}</p>
                                <p className={styles.description__text}>Статус: {sequence.locked ? 'Включено' : 'Выключено'}</p>
                                <p className={styles.description__text}>Последнее изменение {dateTimeNormalize(sequence.lastChange.dateTime)} ({sequence.lastChange.user.fullName})</p>
                            </div>

                            <div className={styles.parameters}>
                                <div className={styles.flex}>
                                    <h4 className={styles.parameters__title}>Сообщения последовательности</h4>
                                    <Button color={'primary'}
                                        variant="contained" title='Сохранить' >Сохранить</Button>
                                </div>
                                <TableMessages messages={sequence.messages} />
                            </div>

                            <div className={styles.parameters}>
                                <h4 className={styles.parameters__title}>Внешние параметры</h4>
                                <TableParameters parameters={sequence.parameters} />
                            </div>
                        </div>
                    )
                }
            </div>

            <ConfirmDialog
                onYesClick={handleDialogYes}
                onNoClick={handleDialogClose}
                title="Вы уверены, что хотите удалить последовательность?"
                onClose={handleDialogClose}
                isOpen={isOpennedDialogDelete}
            />
        </div>
    );
}