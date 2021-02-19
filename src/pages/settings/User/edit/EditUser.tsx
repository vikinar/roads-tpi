import React, { useEffect, useMemo, useState } from 'react';
import { Container, List, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import styles from './EditUser.module.scss';
import { HeaderPanel } from '../../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import { fetchUserRequest, newUserRequest, updateUserRequest } from '../../../../store/modules/user/usersSlice';
import { Form, Formik } from 'formik';
import { useStyles } from '../../../../utils/formStyles';
import { validationSchema } from './validationSchema';
import { UserType } from '../../../../types/user';
import { errorValidation } from '../../../../utils/formErrorValidation';

export const EditUser: React.FC = () => {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();

  const initialProps = {
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    id
  }

  const formStatusProps = {
    success: {
      message: id ? 'Данные пользователя успешно обновлены.' : 'Учётная запись пользователя успешно создано.',
      type: 'success',
    },
    error: {
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    },
  }

  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [value, setValue] = useState<UserType | null>();
  const [formStatus, setFormStatus] = useState<any>({
    message: '',
    type: '',
  })

  useEffect(() => {
    id && dispatch(fetchUserRequest(id));
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if(id) {
      setValue(user)
    } else {
      setValue(null)
    }
  }, [user])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const updateUser = async (data: UserType) => {
    try {
      await dispatch(updateUserRequest({ ...data, id }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/settings/users')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }

  const newUser = async (data: UserType) => {
    try {
      await dispatch(newUserRequest({ ...data }))
      if (data) {
        setFormStatus(formStatusProps.success)
        history.push('/settings/users')
      }
    } catch (error) {
      const response = error.response;
      setFormStatus(formStatusProps.error)
    } finally {
      setDisplayFormStatus(true)
    }
  }

  const handleSubmit = async (data: UserType) => {
    if (id && user?.login) {
      await updateUser(data)
    } else {
      await newUser(data)
    }
  }

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title={`Насройки / Пользователи ${value && value?.login ? `/ ${value?.login}` : ''}`} />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles['content']}>
            <div className={cn(styles['description-title'], styles['description'])}>{id ? `Редактирование` : `Добавление`} пользователя</div>
            <div className={styles['content-inner']}>
              <Formik
                enableReinitialize={true}
                initialValues={value?.login ? value : initialProps}
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
                        <div className={styles['description-title']}>Логин</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='login' label="Логин" placeholder='Логин'
                        value = {values.login} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .login
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .login && errors.login
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Email</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='email' label="Email" placeholder='example@email.com'
                        value = {values.email} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .email
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .email && errors.email
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Имя</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='firstName' label="Имя" placeholder='Иван'
                        value = {values.firstName} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .firstName
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .firstName && errors.firstName
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Фамилия</div><TextField
                        variant={'outlined'}
                        placeholder='Иванов'
                        className={styles.input} name='lastName' label="Фамилия"
                        value = {values.lastName} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .lastName
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .lastName && errors.lastName
                        }
                        required = {true}
                        onBlur={handleBlur}
                      /></div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Отчество</div><TextField
                        variant={'outlined'}
                        placeholder='Иванович'
                        className={styles.input} name='middleName' label="Отчество"
                        value = {values.middleName} onChange={handleChange}
                        error={
                          !!errorValidation(errors, touched)
                            .middleName
                        }
                        helperText={
                          errorValidation(errors, touched)
                            .middleName && errors.middleName
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
                          onClick={() => history.push('/settings/users')}
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
  )
}
