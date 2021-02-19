import React, { useEffect, useMemo, useState } from 'react';
import { Container, List, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import styles from './editCamera.module.scss';
import { HeaderPanel } from '../../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  newCameraRequest,
  updateCameraRequest,
} from '../../../../store/modules/devicesList/devicesListSlice';
import { fetchPostRequest } from '../../../../store/modules/post';

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { fetchCameraByIdRequest } from '../../../../store/modules/devicesList/cameraDevice/cameraDeviceSlice';
import { fetchCameraTypeRequest } from '../../../../store/modules/devicesList/cameraTpye/cameraType';
import { useStyles } from '../../../../utils/formStyles';

export const EditCamera: React.FC = () => {

  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { postId, id } = useParams();

  useEffect(() => {
    id && dispatch(fetchCameraByIdRequest(id))
    dispatch(fetchCameraTypeRequest())
    postId && dispatch(fetchPostRequest(postId))
  }, [dispatch]);

  const deviceCamera = useSelector((state: RootState) => state.cameraById.data);
  const types = useSelector((state: RootState) => state.cameraType.data);
  const post = useSelector((state: RootState) => state.post.data);

  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if(id) {
      setValue({
        ...deviceCamera,
        postId,
        typeId: deviceCamera?.types.filter((item:any) => item.selected === true)[0].value
      })
    } else {
      setValue(null)
    }
  }, [deviceCamera])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      id,
      postId,
      [e.target.name]: e.target.value,
    }))
  }

  const formStatusProps = {
    success: {
      message: id ? 'Устройство успешно обнавлено.' : 'Устройство успешно создано.',
      type: 'success',
    },
    error: {
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    },
  }

  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [formStatus, setFormStatus] = useState<any>({
    message: '',
    type: '',
  })


  const handleSubmit = async (data:any, resetForm:any) => {
    if (id && deviceCamera?.login) {
      try {
        await dispatch(updateCameraRequest({ ...data, postId, id }))
        if (data) {
          setFormStatus(formStatusProps.success)
          history.push('/settings/devices')
        }
      } catch (error) {
        const response = error.response;
        setFormStatus(formStatusProps.error)
      } finally {
        setDisplayFormStatus(true)
      }
    } else {
      try {
        await dispatch(newCameraRequest({ ...data, postId }))
        if (data) {
          setFormStatus(formStatusProps.success)
          history.push('/settings/devices')
        }
      } catch (error) {
        const response = error.response;
        setFormStatus(formStatusProps.error)
      } finally {
        setDisplayFormStatus(true)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <HeaderPanel title={`Насройки / Устройства ${value && value?.name ? `/ ${value?.name}` : ''}`} />
      <div className={styles.wrapper_inner}>
        <Container className={styles.container}>
          <div className={styles['content']}>
            <div className={cn(styles['description-title'], styles['description'])}>{id ? `Редактирование` : `Добавление`} устройства ТПИ</div>
            <div className={cn(styles['description-title_post'], styles['description'])}>Пост: {post?.name}</div>
            <div className={styles['content-inner']}>
              <Formik
                enableReinitialize={true}
                initialValues={value?.typeId ? value : {
                  login: '',
                  name: '',
                  password: '',
                  pollInterval: '',
                  url: '',
                  typeId: ''
                }}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions.resetForm)
                  setTimeout(() => {
                    actions.setSubmitting(false)
                  }, 500)
                }}
                validationSchema={Yup.object().shape({
                  login: Yup.string()
                    .matches(
                      /^(?=.*).{1,50}\S$/, 'В логине устройства должно быть более одного символа.'
                    )
                    .required('Пожалуйста заполните логин для устройства.'),
                  password: Yup.string()
                    .required('Пожалуйста заполните пароль для устойства.'),
                    // .matches(
                    //   /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{5,20})\S$/,
                    //   'В пароле должен быть один заглавный, один строчый, один специалный символ, и не может быть короче 6-и символов.'
                    // ),
                  name: Yup.string()
                    .matches(
                      /^(?=.*).{1,50}\S$/, 'В названии устройства должно быть более одного символа.'
                    )
                    .required('Пожалуйста заполните название устройства.'),
                  pollInterval: Yup.string()
                    .matches(
                      /^([0-9]*$).{0,10}/, 'Интервал может быть задан в числовом значении.'
                    )
                    .required('Пожалуйста заполните интервал.'),
                  url: Yup.string()
                    .matches(
                      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'URL должен содержать префикс http(s), и имя домена.'
                    )
                    .required(
                      'Пожалуйста запишите валидный URL.'
                    ),
                  typeId: Yup.string()
                    .required('Пожалуйста выберите тип устройства.'),
                })}
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
                          errors.login && touched.login
                            ? true
                            : false
                        }
                        helperText={
                          (errors.login && touched.login)
                          && errors.login
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Название</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='name' label="Название" placeholder='Камера - 01'
                        value = {values.name} onChange={handleChange}
                        error={
                          errors.name && touched.name
                            ? true
                            : false
                        }
                        helperText={
                          (errors.name && touched.name)
                          && errors.name
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
                          errors.password && touched.password
                            ? true
                            : false
                        }
                        helperText={
                          (errors.password && touched.password)
                          && errors.password
                        }
                        required = {true}
                        type = 'password'
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                      <div className={styles['description-title']}>Интервал</div><TextField
                      variant={'outlined'}
                      placeholder='Интервал'
                      className={styles.input} name='pollInterval' label="Интервал"
                      value = {values.pollInterval} onChange={handleChange}
                      error={
                        errors.pollInterval && touched.pollInterval
                          ? true
                          : false
                      }
                      helperText={
                        (errors.pollInterval && touched.pollInterval)
                        && errors.pollInterval
                      }required = {true}
                      onBlur={handleBlur}
                    /></div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>URL</div><TextField
                        variant={'outlined'}
                        placeholder='https://www.example.com/'
                        className={styles.input} name='url' label="URL"
                        value = {values.url} onChange={handleChange}
                        error={
                          errors.url && touched.url
                            ? true
                            : false
                        }
                        helperText={
                          (errors.url && touched.url)
                          && errors.url
                        }required = {true}
                        onBlur={handleBlur}
                      /></div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Тип</div>
                        <FormControl className={styles.input}>
                          <InputLabel className={styles.label} htmlFor="name-shared">Тип</InputLabel>
                          <Select
                            value={values.typeId}
                            onChange={handleChange}
                            variant = {'outlined'}
                            inputProps={{
                              name: "typeId",
                              id: "typeId"
                            }}
                            error={
                              errors.typeId && touched.typeId
                                ? true
                                : false
                            }
                            onBlur={handleBlur}
                            required = {true}
                          >
                            <MenuItem value="" placeholder={'ТПИ-01 1000*250'}>
                              <em>None</em>
                            </MenuItem>
                            {types.map((type:any) => (
                              <MenuItem key={"typeId" + type.id} value={type.id}>
                                {type.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                          onClick={() => history.push('/settings/devices')}
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
