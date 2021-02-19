import React, { useEffect, useMemo, useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import styles from './EditTpiConfig.module.scss';
import { HeaderPanel } from '../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Form, Formik } from 'formik';
import { useStyles } from '../../../utils/formStyles';
import { errorValidation } from '../../../utils/formErrorValidation';

import { validationSchema } from './validationSchema';
import { TpiConfig } from '../../../types/tpiConfig';
import {
  fetchTpiConfigRequest,
  newTpiConfigRequest,
  updateTpiConfigRequest,
} from '../../../store/modules/tpiConfig/tpiConfig';


export const EditTpiConfig: React.FC = () => {
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
  const [value, setValue] = useState<TpiConfig | null>(null);
  const [formStatus, setFormStatus] = useState<any>({
    message: '',
    type: '',
  })

  const initialProps = {
    description: '',
    height: 0,
    name: '',
    pageDurationMax: 0,
    pageDurationMin: 0,
    width: 0,
    id
  }

  useEffect(() => {
    id && dispatch(fetchTpiConfigRequest(id));
  }, [dispatch]);

  const tpiConfig = useSelector((state: RootState) => state.tpiConfig.data);

  useEffect(() => {
    if(id) {
      setValue(tpiConfig)
    } else {
      setValue(null)
    }
  }, [tpiConfig])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const updateExternalSystem = async (data: TpiConfig) => {
    try {
      await dispatch(updateTpiConfigRequest({ ...data, id }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/configurations')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }
  const newExternalSystem = async (data: TpiConfig) => {
    try {
      await dispatch(newTpiConfigRequest({ ...data }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/configurations')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }

  const handleSubmit = async (data:TpiConfig) => {
    if (id && tpiConfig?.name) {
      await updateExternalSystem(data)
    } else {
      await newExternalSystem(data)
    }
  }

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title={`ТПИ / Конфигуарции ТПИ ${value && value?.name ? `/ ${value?.name}` : ''}`} />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles['content']}>
            <div className={cn(styles['description-title'], styles['description'])}>{id ? `Редактирование` : `Добавление`} конфигурации ТПИ</div>
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
                        <div className={styles['description-title']}>Ширина</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='width' label="Ширина" placeholder='Ширина'
                        value = {values.width} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .width
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .width && errors.width
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Высота</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='height' label="Высота" placeholder='Высота'
                        value = {values.height} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .height
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .height && errors.height
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Мин.</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='pageDurationMin' label="Мин. длительность сообщения" placeholder='Мин. длительность сообщениния'
                        value = {values.pageDurationMin} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .pageDurationMin
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .pageDurationMin && errors.pageDurationMin
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Макс.</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='pageDurationMax' label="Макс. длительность сообщения" placeholder='Макс. длительность сообщениния'
                        value = {values.pageDurationMax} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .pageDurationMax
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .pageDurationMax && errors.pageDurationMax
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>

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
                          onClick={() => history.push('/configurations')}
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
