import React, {useCallback, useEffect, useState} from 'react';
import {HeaderPanel} from '../../components/HeaderPanel';
import styles from './ExternalParametersPage.module.scss';
import {useHistory, useParams} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
    fetchAddParamaterInGroupReqeuest,
    fetchEditExternalGroupRequest,
    fetchExternalAddGroupRequest,
    fetchExternalParametersGroupRequest,
    fetchExternalParametersRemoveGroupByIdRequest,
    startLoadingGroups,
} from '../../store/modules/externalParameters/externalParametersGroup/externalParametersGroupSlice';
import {DialogExternalParametersGroup} from '../../components/DialogExternalParametersGroup';
import {fetchExternalParametersByGroupId} from '../../store/modules/externalParameters/externalParameters/externalParametersSlice';
import {EditExternalParametersPage} from '../EditExternalParametersPage';
import {ConfirmDialog} from "../../components/ConfirmDialog";
import {SideBarMenuParameters} from "../../components/SideBarMenuParameters";
import {DialogExternalEditParameter} from "../../components/DialogExternalEditParameter";
import {
    fetchExternalParameterDeleteRequest,
    loadingParameters
} from "../../store/modules/externalParameters/externalParameter/externalParameterSlice";
import cn from "classnames";


export const ExternalParametersPage: React.FC = () => {
        // @ts-ignore
        const {id} = useParams();
        const dispatch = useDispatch();
        const histore = useHistory();
        const parameterGroup = useSelector((state: RootState) => state.externalParameters.groups);
        const groups = parameterGroup.data;
        const loadingGroups = parameterGroup.loading;
        const groupParam = useSelector((state: RootState) => state.externalParameters.parameters);
        const group: any = groupParam.data;
        const loadingParams = groupParam.loading;

        const [isDialogGroupOpen, setIsDialogGroupOpen] = useState(false);
        const [isDialogPamareterOpen, setIsDialogPamareterOpen] = useState(false);
        const [isEditDialogGroup, setIsEditDialogGroup] = useState(false);
        const [isConfirmRemoveGroup, setIsConfirmRemoveGroup] = useState(false);
        const [isConfirmRemoveParameter, setIsConfirmRemoveParameter] = useState(false);
        const [idDeleteParameter, setIdDeleteParameter] = useState<number>();

        useEffect(() => {
            id && dispatch(fetchExternalParametersByGroupId(id));
        }, [id, loadingGroups, loadingParams]);

        useEffect(() => {
            dispatch(fetchExternalParametersGroupRequest());
        }, [loadingGroups, loadingParams]);


        const handleAddGroup = (group: any) => {
            dispatch(startLoadingGroups());
            if (isEditDialogGroup) {
                dispatch(fetchEditExternalGroupRequest(group));
            } else {
                dispatch(fetchExternalAddGroupRequest(group));
            }
            closeDialogGroup();
        };

        const handleAddParameter = (parameter: any) => {
            dispatch(startLoadingGroups());
            dispatch(fetchAddParamaterInGroupReqeuest({...parameter, groupId: id}));
            closeDialogGroup();
        }

        const handleRemoveParameterSuccess = () => {
            dispatch(loadingParameters());
            if (idDeleteParameter) {
                dispatch(fetchExternalParameterDeleteRequest(idDeleteParameter));
            }

            closeDialogGroup();
        }

        const closeDialogGroup = () => {
            setIsDialogGroupOpen(false);
            setIsEditDialogGroup(false);
            setIsDialogPamareterOpen(false);
            setIdDeleteParameter(undefined);
            setIsConfirmRemoveParameter(false)
        };

        const openDialogGroupEdit = () => {
            setIsDialogGroupOpen(true);
        };

        const handleEditDialogGroup = () => {
            setIsEditDialogGroup(true);
            openDialogGroupEdit();
        }

        const handleEditParamaterClick = () => {
            setIsDialogPamareterOpen(true);
        }

        const handleRemoveParameter = (id: number) => {
            setIdDeleteParameter(id);
            setIsConfirmRemoveParameter(true);
        }

        const handleRemoveGroupById = useCallback(async () => {
            setIsConfirmRemoveGroup(true);
        }, [dispatch]);

        const removeGroupById = () => {
            dispatch(startLoadingGroups());
            dispatch(fetchExternalParametersRemoveGroupByIdRequest(id));
            hideConfirmRemoveGroup();
            histore.push('/externalParameters');
        }

        const hideConfirmRemoveGroup = () => {
            setIsConfirmRemoveGroup(false);
            setIsConfirmRemoveParameter(false)
        }

        return (
            <div className={styles.wrapper}>
                <HeaderPanel
                    title={'ТПИ / Внешние параметры' + ((id && group?.group) ? ` / ${group.group.code}` : '')}/>
                <div className={styles.wrapper_inner}>
                    <SideBarMenuParameters
                        groups={groups}
                        openDialogGroupEdit={openDialogGroupEdit}
                    />

                    {
                        (id && group) && <EditExternalParametersPage
                            onEditButtonClick={handleEditDialogGroup}
                            onRemoveGroup={handleRemoveGroupById}
                            onEditParameterClick={handleEditParamaterClick}
                            onRemoveParameter={handleRemoveParameter}
                            {...group}
                        />
                    }

                </div>
                {
                    isDialogGroupOpen && <DialogExternalParametersGroup
                        isOpen={isDialogGroupOpen}
                        onSuccess={handleAddGroup}
                        onCancel={closeDialogGroup}
                        group={isEditDialogGroup && group?.group}
                    />
                }

                {
                    isDialogPamareterOpen && <DialogExternalEditParameter
                        isOpen={isDialogPamareterOpen}
                        onSuccess={handleAddParameter}
                        onCancel={closeDialogGroup}
                        parameter={isEditDialogGroup && group.group}
                    />
                }

                <ConfirmDialog
                    isOpen={isConfirmRemoveGroup}
                    title="Вы уверены, что хотите удалить группу?"
                    onClose={hideConfirmRemoveGroup}
                    onNoClick={hideConfirmRemoveGroup}
                    onYesClick={removeGroupById}
                />

                <ConfirmDialog
                    isOpen={isConfirmRemoveParameter}
                    title="Вы уверены, что хотите удалить параметр?"
                    onClose={hideConfirmRemoveGroup}
                    onNoClick={hideConfirmRemoveGroup}
                    onYesClick={handleRemoveParameterSuccess}
                />
            </div>
        );
    }
;
