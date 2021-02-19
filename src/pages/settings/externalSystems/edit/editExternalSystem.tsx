import React, { useEffect, useMemo, useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import styles from './editExternalSystem.module.scss';
import { HeaderPanel } from '../../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Form, Formik } from 'formik';

import { useStyles } from '../../../../utils/formStyles';
import { errorValidation } from '../../../../utils/formErrorValidation';

import {
  fetchExternalSystemRequest,
  newExternalSystemRequest,
  updateExternalSystemRequest,
} from '../../../../store/modules/externalSystems/externalSystemsSlice';
import { ExternalSystem } from '../../../../types/externalSystem';
import { validationSchema } from './validationSchema';

export const EditExternalSystem: React.FC = () => {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore

  const { id } = useParams();

  const formStatusProps = {
    success: {
      message: id ? 'Внешняя система успешно обновлена.' : 'Внешняя система успешно создана.',
      type: 'success',
    },
    error: {
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    },
  }

  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [value, setValue] = useState<ExternalSystem | null>(null);
  const [formStatus, setFormStatus] = useState<any>({
    message: '',
    type: '',
  })

  const initialProps = {
    description: '',
    name: '',
    password: '',
    id
  }

  useEffect(() => {
    id && dispatch(fetchExternalSystemRequest(id));
  }, [dispatch]);

  const externalSystem = useSelector((state: RootState) => state.externalSystem.data);

  useEffect(() => {
    if(id) {
      setValue(externalSystem)
    } else {
      setValue(null)
    }
  }, [externalSystem])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const updateExternalSystem = async (data: ExternalSystem) => {
    try {
      await dispatch(updateExternalSystemRequest({ ...data, id }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/settings/external-systems')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }
  const newExternalSystem = async (data: ExternalSystem) => {
    try {
      await dispatch(newExternalSystemRequest({ ...data }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/settings/external-systems')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }

  const handleSubmit = async (data:ExternalSystem) => {
    if (id && externalSystem?.name) {
      await updateExternalSystem(data)
    } else {
      await newExternalSystem(data)
    }
  }

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title={`Насройки / Внешние Системы ${value && value?.name ? `/ ${value?.name}` : ''}`} />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles['content']}>
            <div className={cn(styles['description-title'], styles['description'])}>{id ? `Редактирование` : `Добавление`} внешней системы</div>
            <div className={styles['content-inner']}>
              <Formik
                enableReinitialize={true}
                initialValues={value?.name ? value : initialProps}
                onSubmit={(values, actions) => {
                  handleSubmit(values)
                  setTimeout(() => {
                    actions.setSubmitting(false)
                  }, 500)
                }}
                validationSchema={validationSchema}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                  } = props
                  return (
                    <Form>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Название</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='name' label="Название" placeholder='Название'
                        value = {values.name} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .name
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .name && errors.name
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Описание</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='description' label="Описание" placeholder='Описание'
                        value = {values.description} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .description
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .description && errors.description
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Пароль</div><TextField
                        variant={'outlined'}
                        placeholder='Пароль'
                        className={styles.input} name='password' label="Пароль"
                        value = {values.password} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .password
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .password && errors.password
                        }
                        required = {true}
                        onBlur={handleBlur}
                      /></div>
                      {displayFormStatus && (
                        <div className="formStatus">
                          {formStatus.type === 'error' ? (
                            <p
                              className={
                                classes.errorMessage
                              }
                            >
                              {formStatus.message}
                            </p>
                          ) : formStatus.type ===
                          'success' ? (
                            <p
                              className={
                                classes.successMessage
                              }
                            >
                              {formStatus.message}
                            </p>
                          ) : null}
                        </div>
                      )}
                      <hr/>
                      <div className={styles['content_btns']}>
                        <Button
                          type = 'submit'
                          color={!isSubmitting ? 'primary' : 'default'}
                          variant="contained"
                          disabled = {isSubmitting}
                          className={styles['content_btn']}
                        >
                          Сохранить
                        </Button>
                        <Button
                          onClick={() => history.push('/settings/external-systems')}
                          className={styles['content_btn']}
                        >
                          Отмена
                        </Button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
