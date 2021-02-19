import React from 'react';
import {Formik, Form, Field} from 'formik'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem} from '@material-ui/core';
import * as Yup from 'yup';
import styles from './DialogAddRealization.module.scss';
import { errorValidation } from '../../utils/formErrorValidation';

export interface IDialogExternalParametersGroup {
    isOpen: boolean;
    onSuccess: (configurationId: number) => void;
    onCancel: () => void;
    configurations: any[];
}

const SignupSchema = Yup.object().shape({});

export const DialogAddRealization: React.FC<IDialogExternalParametersGroup> = (props: IDialogExternalParametersGroup) => {
    const {
        configurations,
        onCancel,
        onSuccess,
        isOpen
    } = props;
    const handleDialogCancel = () => {
        onCancel();
    };

    const handleDialogSubmit = (values: any) => {
        onSuccess(values.configurationId);
    }

    const initalFormik = {
        configurationId: configurations[0] ? configurations[0].id : null
    };

    return (
        <Dialog className={styles.dialog} open={props.isOpen}>
            <DialogTitle>Создание реализации</DialogTitle>

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
                                        variant='outlined'
                                        className={styles.dialog__field}
                                        onChange={handleChange}
                                        as={Select}
                                        name="configurationId"
                                        error={errorValidation(errors, touched).configurationId}
                                        helperText={errorValidation(errors, touched).configurationId && errors.configurationId}
                                    >
                                        {
                                            configurations &&  configurations.map((item: any) => (<MenuItem value={item.id}>{item.name}</MenuItem>))
                                        }
                                    </Field>
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color={!isSubmitting ? 'primary' : 'default'}
                                    disabled={isSubmitting}
                                    variant="contained"
                                    className={styles['content_btn']}
                                    onClick={submitForm}
                                >Сохранить</Button>
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
