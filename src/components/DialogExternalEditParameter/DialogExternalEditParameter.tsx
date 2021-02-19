import React from 'react';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import styles from './DialogExternalEditParameter.module.scss';
import { IExternalParameterResponse } from "../../types/externalParameters";
import { regEx } from "../../utils/regEx";
import { errorValidation } from "../../utils/formErrorValidation";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const INPUT_REQUIRED_TEXT_ERROR = 'Поле обязательно к заполнению';

export interface IDialogExternalParametersGroup {
    isOpen: boolean;
    parameter: any;
    onSuccess: (data: IExternalParameterResponse) => void;
    onCancel: () => void;
    isCopy?: boolean;
}

const SignupSchema = Yup.object().shape({
    code: Yup.string().matches(regEx.string, 'Можно использовать только строки').min(3, 'Код не может быть короче трех символов').required(INPUT_REQUIRED_TEXT_ERROR),
    description: Yup.string().matches(regEx.string, 'Можно использовать только строки').min(3, 'Код не может быть короче трех символов').required(INPUT_REQUIRED_TEXT_ERROR),
    lifeTime: Yup.string().matches(regEx.onlyNumbers, 'Можно использовать только цифры').required(INPUT_REQUIRED_TEXT_ERROR),
    testValue: Yup.string().required(INPUT_REQUIRED_TEXT_ERROR),
    type: Yup.string().matches(regEx.string, 'Можно использовать только строки').required(INPUT_REQUIRED_TEXT_ERROR)
});

export const DialogExternalEditParameter: React.FC<IDialogExternalParametersGroup> = (props: IDialogExternalParametersGroup) => {
    const { parameter, isCopy } = props;
    const isEdit = Boolean(parameter);

    const handleDialogCancel = () => {
        props.onCancel();
    };

    const handleDialogSubmit = (values: any) => {
        props.onSuccess(values);
    }

    const initalFormik = {
        code: parameter?.code || '',
        description: parameter?.description || '',
        testValue: parameter?.testValue || '',
        type: parameter?.type || '',
        lifeTime: parameter?.lifeTime || 0,
        id: parameter?.id
    };

    const getNameTitleDialog = () => {
        if (isCopy) {
            return 'Копирование параметра';
        }

        return isEdit ? 'Редактирование параметра' : 'Создание параметра';
    }

    return (
        <Dialog className={styles.dialog} open={props.isOpen}>
            <DialogTitle>{getNameTitleDialog()}</DialogTitle>

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
                                    <Field
                                        name="testValue"
                                        as={TextField}
                                        className={styles.dialog__field}
                                        variant='outlined'
                                        label='Тестовое значение'
                                        error={errorValidation(errors, touched).testValue}
                                        helperText={errorValidation(errors, touched).testValue && errors.testValue}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        variant='outlined'
                                        className={styles.dialog__field}
                                        onChange={handleChange}
                                        as={Select}
                                        name="type"
                                        error={errorValidation(errors, touched).type}
                                        helperText={errorValidation(errors, touched).type && errors.type}
                                    >
                                        <MenuItem value={'FLOAT'}>FLOAT</MenuItem>
                                    </Field>
                                    <Field
                                        name="lifeTime"
                                        as={TextField}
                                        className={styles.dialog__field}
                                        variant='outlined'
                                        label='Время жизни'
                                        error={errorValidation(errors, touched).lifeTime}
                                        helperText={errorValidation(errors, touched) && errors.lifeTime}
                                        onChange={handleChange}
                                    />
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color={!isSubmitting ? 'primary' : 'default'}
                                    disabled={isSubmitting}
                                    variant="contained"
                                    className={styles['content_btn']}
                                    onClick={submitForm}
                                >{isEdit && !isCopy ? 'Редактировать' : 'Сохранить'}</Button>
                                <Button variant="contained" className={styles['content_btn']}
                                    onClick={handleDialogCancel}>Отменить</Button>
                            </DialogActions>
                        </div>
                    )
                }}
            </Formik>
        </Dialog>
    );
};
