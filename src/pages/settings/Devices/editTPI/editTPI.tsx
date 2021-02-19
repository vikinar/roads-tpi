import React, { useEffect, useMemo, useState } from 'react';
import { Container, List, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import styles from './editTPI.module.scss';
import { HeaderPanel } from '../../../../components/HeaderPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import { fetchTpiByIdRequest } from '../../../../store/modules/devicesList/tpiDevice/tpiDeviceSlice';
import { newTpiRequest, updateTpiRequest } from '../../../../store/modules/devicesList/devicesListSlice';
import { fetchTpiTypeRequest } from '../../../../store/modules/devicesList/tpiType/tpiType';
import { fetchPostRequest } from '../../../../store/modules/post';
import { fetchTpiConfigListRequest } from '../../../../store/modules/tpiConfig/tpiConfig';

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useStyles } from '../../../../utils/formStyles';

export const EditTPI: React.FC = () => {

  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { postId, id } = useParams();

  useEffect(() => {
    id && dispatch(fetchTpiByIdRequest(id))
    dispatch(fetchTpiTypeRequest())
    dispatch(fetchTpiConfigListRequest())
    postId && dispatch(fetchPostRequest(postId))
  }, [dispatch]);

  const config = [{
    value: 'ТПИ 1000*250',
    id: '1'
  }]

  const deviceTpi = useSelector((state: RootState) => state.tpiById.data);
  const types = useSelector((state: RootState) => state.tpiType.data);
  const post = useSelector((state: RootState) => state.post.data);
  const configs = useSelector((state: RootState) => state.tpiConfigList.data);

  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if(id) {
      setValue({
        ...deviceTpi,
        configurationId: deviceTpi?.configurations.filter((item:any) => item.selected === true)[0].value,
        typeId: deviceTpi?.types.filter((item:any) => item.selected === true)[0].value
      })
    } else {
      setValue(postId)
    }
  }, [deviceTpi])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
      id,
      postId: parseInt(postId),
      [e.target.name]: e.target.value,
    }))
  }

  const formStatusProps = {
    success: {
      message: id ? 'Пост успешно обнавлён.' : 'Пост успешно создан.',
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
    if (id && deviceTpi?.name) {
      try {
        await dispatch(updateTpiRequest({ ...data, postId, id }))
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
        await dispatch(newTpiRequest({ ...data, postId }))
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
                initialValues={value?.name ? value : {
                  configurationId: '',
                  ip: '',
                  name: '',
                  port: '',
                  typeId: '',
                  postId
                }}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions.resetForm)
                  setTimeout(() => {
                    actions.setSubmitting(false)
                  }, 500)
                }}
                validationSchema={Yup.object().shape({
                  configurationId: Yup.string()
                    .required('Пожалуйста выберите конфигурацию устройства.'),
                  ip: Yup.string()
                    .required('Пожалуйста заполните ip адрес устройства.')
                    .matches(
                      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 'Пожалуйста заполните валидный ip адрес.'
                    ),
                  name: Yup.string()
                    .matches(
                      /^(?=.*).{1,50}\S$/, 'В названии устройства должно быть более одного символа.'
                    )
                    .required('Пожалуйста заполните порт устройства.'),
                  port: Yup.string()
                    .matches(
                    /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/, 'Порт должен содержать толко цифры.'
                    )
                    .required(
                      'Пожалуйста запишите валидную широту.'
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
                        <div className={styles['description-title']}>Название</div><TextField
                        variant={'outlined'}
                        className={styles.input} name='name' label="Название" placeholder='ТПИ-01'
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
                        <div className={styles['description-title']}>IP</div><TextField
                        variant={'outlined'}
                        placeholder='00.00.00.00'
                        className={styles.input} name='ip' label="IP"
                        value = {values.ip} onChange={handleChange}
                        error={
                          errors.ip && touched.ip
                            ? true
                            : false
                        }
                        helperText={
                          (errors.ip && touched.ip)
                          && errors.ip
                        }
                        required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>TCP порт</div><TextField
                        variant={'outlined'}
                        placeholder='0000'
                        className={styles.input} name='port' label="TCP порт"
                        value = {values.port} onChange={handleChange}
                        error={
                          errors.port && touched.port
                            ? true
                            : false
                        }
                        helperText={
                          (errors.port && touched.port)
                          && errors.port
                        }required = {true}
                        onBlur={handleBlur}
                      />
                      </div>
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
                      <div className={styles['form-line']}>
                        <div className={styles['description-title']}>Конфигурация</div>
                        <FormControl className={styles.input}>
                          <InputLabel className={styles.label} htmlFor="name-shared">Конфигурация</InputLabel>
                          <Select
                            value={values.configurationId}
                            onChange={handleChange}
                            variant = {'outlined'}
                            inputProps={{
                              name: "configurationId",
                              id: "configurationId"
                            }}
                            error={
                              errors.configurationId && touched.configurationId
                                ? true
                                : false
                            }
                            required = {true}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="" placeholder={'ТПИ-01 1000*250'}>
                              <em>None</em>
                            </MenuItem>
                            {configs.map((conf:any) => (
                              <MenuItem key={"configurationId" + conf.id} value={conf.id}>
                                {conf.name}
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
