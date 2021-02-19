import React from 'react';
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import styles from './DialogExternalParametersGroup.module.scss';
import {IExternalGroupRequest} from "../../types/externalParameters";
import {errorValidation} from "../../utils/formErrorValidation";
import {regEx} from "../../utils/regEx";

const INPUT_REQUIRED_TEXT_ERROR = 'Поле обязательно к заполнению';


export interface IDialogExternalParametersGroup {
    isOpen: boolean;
    group: any;
    onSuccess: (data: IExternalGroupRequest) => void;
    onCancel: () => void;
}

const SignupSchema = Yup.object().shape({
    code: Yup.string().matches(regEx.string, 'Только символы').min(3, 'Код не может быть короче трех символов').required(INPUT_REQUIRED_TEXT_ERROR),
    description: Yup.string().matches(regEx.string, 'Только символы').min(3, 'Код не может быть короче трех символов').required(INPUT_REQUIRED_TEXT_ERROR),
});

export const DialogExternalParametersGroup: React.FC<IDialogExternalParametersGroup> = (props: IDialogExternalParametersGroup) => {
    const {group} = props;
    const isEdit = Boolean(group);

    const handleDialogCancel = () => {
        props.onCancel();
    };

    const handleDialogSubmit = (values: any) => {
        props.onSuccess(values);
    }

    const initalFormik = {
        code: group?.code || '',
        description: group?.description || '',
        id: group?.id
    };

    return (
        <Dialog className={styles.dialog} open={props.isOpen}>
            <DialogTitle>{isEdit ? 'Редактирование группы' : 'Создание группы'}</DialogTitle>

            <Formik
                enableReinitialize={true}
                validationSchema={SignupSchema}
                initialValues={initalFormik}
                onSubmit={(values, actions) => {
                    handleDialogSubmit(values);
                }}
            >
                {(props) => {
                    const {
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        submitForm
                    } = props;

                    return (
                        <div>
                            <DialogContent className={styles.dialog__content}>
                                <Form className={styles.dialog__content}>
                                    <Field
                                        name="code"
                                        as={TextField}
                                        className={styles.dialog__field}
                                        variant='outlined'
                                        label='Код'
                                        error={errorValidation(errors, touched).code}
                                        helperText={errorValidation(errors, touched).code && errors.code}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        name="description"
                                        as={TextField}
                                        className={styles.dialog__field}
                                        variant='outlined'
                                        label='Описание'
                                        error={errorValidation(errors, touched).description}
                                        helperText={errorValidation(errors, touched).description && errors.description}
                                        onChange={handleChange}
                                    />
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color={!isSubmitting ? 'primary' : 'default'}
                                    variant="contained"
                                    className={styles['content_btn']}
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >{isEdit ? 'Редактировать' : 'Сохранить'}</Button>
                                <Button variant="contained" className={styles['content_btn']} onClick={handleDialogCancel}>Отменить</Button>
                            </DialogActions>
                        </div>
                    )
                }}
            </Formik>
        </Dialog>
    );
};
