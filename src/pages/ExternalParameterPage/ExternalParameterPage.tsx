import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {RootState} from "../../store";
import styles from './ExternalParameterPage.module.scss';
import {
    fetchExternalParameterByIdRequest,
    fetchExternalParameterDeleteRequest,
    fetchExternalParameterEditRequest,
    loadingParameters
} from "../../store/modules/externalParameters/externalParameter/externalParameterSlice";
import {HeaderPanel} from "../../components/HeaderPanel";
import {SideBarMenuParameters} from "../../components/SideBarMenuParameters";
import {Table} from "../../components/Table";
import {
    fetchAddParamaterInGroupReqeuest,
    fetchExternalParametersGroupRequest
} from "../../store/modules/externalParameters/externalParametersGroup/externalParametersGroupSlice";
import {fetchExternalParametersByGroupId} from "../../store/modules/externalParameters/externalParameters/externalParametersSlice";
import {ConfirmDialog} from "../../components/ConfirmDialog";
import {DialogExternalEditParameter} from "../../components/DialogExternalEditParameter";
import {dateTimeNormalize} from "../../utils/dateTimeNormalize";
import cn from "classnames";

export const ExternalParameterPage: React.FC = () => {
    const dispatch = useDispatch();
    //@ts-ignore
    const params: {
        parameterId: number
    } = useParams()

    const [isConfirmRemoveParameter, setIsConfirmRemoveParameter] = useState(false);
    const [isDialogPamareterOpen, setIsDialogPamareterOpen] = useState(false);
    const [isCopyParameter, setIsCopyParameter] = useState(false);
    const [isAddParameter, setIsAddParameter] = useState(false);

    const groups = useSelector((state: RootState) => state.externalParameters.groups.data);
    const parameterSelector = useSelector((state: RootState) => state.externalParameters.parameter);
    const parameter = parameterSelector.data;
    const loadingParameter = parameterSelector.loading;
    const group: any = useSelector((state: RootState) => state.externalParameters.parameters.data);
    const {lastChange} = parameter;
    const {parameterId} = params;


    useEffect(() => {
        parameter.group && dispatch(fetchExternalParametersByGroupId(parameter.group.id));
    }, [parameter, dispatch, loadingParameter]);


    useEffect(() => {
        parameterId && dispatch(fetchExternalParameterByIdRequest(parameterId))
    }, [parameterId, loadingParameter]);

    useEffect(() => {
        dispatch(fetchExternalParametersGroupRequest());
    }, [dispatch]);

    const titleHeaderPanel = `ТПИ / Внешние параметры / ${parameter.group && parameter.group.code} / ${parameter.code}`;

    const columns = useMemo(() => {
        return [
            {
                name: 'code',
                title: 'Код',
                headerClassName: styles['table-header'],
            },
            {
                name: 'description',
                title: 'Название',
                headerClassName: styles['table-header'],
            },
            {
                name: 'testValue',
                title: 'Последнее изменение',
                headerClassName: styles['table-header'],
            },
        ];
    }, []);

    const handleRemoveClick = () => {
        setIsConfirmRemoveParameter(true);
    }

    const handleCopyParameter = () => {
        setIsCopyParameter(true);
        handleAddParameter();
    }

    const hideConfirmRemoveDialog = () => {
        setIsConfirmRemoveParameter(false);
    }

    const handleRemoveConfirmSuccess = () => {
        dispatch(loadingParameters());
        dispatch(fetchExternalParameterDeleteRequest(parameter.id));
        hideConfirmRemoveDialog();
    }

    const handleEditClick = () => {
        setIsDialogPamareterOpen(true);
    }

    const handleSuccessEditParameter = (data: any) => {
        dispatch(loadingParameters());
        if (isCopyParameter || isAddParameter) {
            dispatch(fetchAddParamaterInGroupReqeuest({...data, groupId: parameter.group.id}));
        } else {
            dispatch(fetchExternalParameterEditRequest(data));
        }
        handleDialogParameterClose();
    }

    const handleDialogParameterClose = () => {
        setIsDialogPamareterOpen(false);
        setIsCopyParameter(false);
        setIsAddParameter(false);
    }

    const handleAddParameter = () => {
        setIsDialogPamareterOpen(true);
        setIsAddParameter(true)
    }

    return (
        <div className={styles.wrapper}>
            <HeaderPanel title={titleHeaderPanel}/>
            <div className={styles.wrapper_inner}>
                <SideBarMenuParameters
                    groups={groups}
                    selectParameterId={parameterId}
                    group={group}
                    onAddParameter={handleAddParameter}
                />

                <div className={cn(styles.wrapper, styles.wrapper__content)}>
                    <div className={styles.header}>
                        <Button onClick={handleCopyParameter}>Копировать</Button>
                        <Button onClick={handleEditClick}>Редактировать</Button>
                        <Button onClick={handleRemoveClick}>Удалить</Button>
                    </div>

                    {
                        lastChange && <div className={styles.description}>
                            <h2 className={styles.description__title}>{parameter.code}</h2>
                            <p className={styles.description__text}>Время жизни: {parameter.lifeTime}ч</p>
                            <p className={styles.description__text}>Тип данных: {parameter.type}</p>
                            <p className={styles.description__text}>Тестовое значение: {parameter.testValue}</p>
                            <p className={styles.description__text}>Последнее
                                изменение: {dateTimeNormalize(lastChange.dateTime)} ({lastChange.user.fullName})</p>
                        </div>
                    }

                    <div className={styles.parameters}>
                        <h4 className={styles.parameters__title}>Сообщения ТПИ</h4>

                        <Table
                            className={styles.table_grid}
                            columns={columns}
                            rows={parameter.messages || []}
                        ></Table>
                    </div>
                </div>
            </div>

            {
                isDialogPamareterOpen && <DialogExternalEditParameter
                    isOpen={isDialogPamareterOpen}
                    onSuccess={handleSuccessEditParameter}
                    onCancel={handleDialogParameterClose}
                    parameter={(!isAddParameter || isCopyParameter) && parameter}
                    isCopy={isCopyParameter}
                />
            }

            <ConfirmDialog
                isOpen={isConfirmRemoveParameter}
                title="Вы уверены, что хотите удалить параметр?"
                onClose={hideConfirmRemoveDialog}
                onNoClick={hideConfirmRemoveDialog}
                onYesClick={handleRemoveConfirmSuccess}
            />
        </div>
    )
}
