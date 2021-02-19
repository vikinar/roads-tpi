import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, List, TextField, Button, makeStyles, createStyles, } from '@material-ui/core';
import styles from './EditPost.module.scss';
import { HeaderPanel } from '../../../../components/HeaderPanel';
import { SideMenuItem } from '../../../../components/SideMenu/components/SideMenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

// @ts-ignore
import ResizePanel from "react-resize-panel";

import {
  fetchPostRequest,
  newPostRequest,
  updatePostRequest,
} from '../../../../store/modules/post/postSlice';
import { fetchPostList } from '../../../../store/modules/postsList';

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useStyles } from '../../../../utils/formStyles';

export const EditPost: React.FC = () => {

  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();

  const [sideId, setSideId] = useState<any>(id)

  useEffect(() => {
    dispatch(fetchPostList());
    sideId && dispatch(fetchPostRequest(sideId));
  }, [dispatch, id]);

  const posts = useSelector((state: RootState) => state.postList.data);
  const post = useSelector((state: RootState) => state.post.data);

  const [value, setValue] = useState<any>(null);


  const sideMenuItems = useMemo(
    () =>
      posts?.map((post:any) => ({
        ...post,
        title: post.name,
      })),
    [posts],
  );

  useEffect(() => {
    if(id) {
      setValue(post)
    } else {
      setValue(null)
    }
  }, [post])

  const handleSinglePost = useCallback((id:number) => {
    setSideId(sideMenuItems[id].id)
    history.push(`/settings/edit/post/${sideMenuItems[id].id}`)
  }, [sideId, sideMenuItems])

  const handleChange = (e:any) => {
    setValue((prevState:any) => ({
      ...prevState,
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
    if (id && post?.name) {
      try {
        setValue((prevState:any) => ({
          ...prevState,
          ...data
        }))
        await dispatch(updatePostRequest({ ...data }))
        if (data) {
          setFormStatus(formStatusProps.success)
          history.push('/settings/posts')
        }
      } catch (error) {
        const response = error.response;
        setFormStatus(formStatusProps.error)
      } finally {
        setDisplayFormStatus(true)
      }
    } else {
      try {
        setValue((prevState:any) => ({
          ...prevState,
          ...data
        }))
        await dispatch(newPostRequest({ ...data }))
        if (data) {
          setFormStatus(formStatusProps.success)
          history.push('/settings/posts')
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
      <HeaderPanel title={`ТПИ / Посты / ${value && value?.name ? value?.name : ''}`} />
      <div className={styles.wrapper_inner}>
          <ResizePanel direction="e">
            <div className={cn(styles.list, 'header', 'panel')}>
          <div className={styles['list-title']}>Выберите пост</div>
          <List component="nav" disablePadding>
            {sideMenuItems?.map((item:any, index:number) => (
              <SideMenuItem key={item.id} className={styles['menu-item']} onClick={() => handleSinglePost(index)} {...item} />
            ))}
          </List>
            </div>
          </ResizePanel>
        <div className={styles['content-wrapper']}>
          <div className={styles['content']}>
            <div className={cn(styles['description-title'], styles['description'])}>{id ? `Редактирование` : `Добавление`} поста</div>
            <div className={styles['content-inner']}>
              <Formik
                enableReinitialize={true}
                initialValues={value?.name ? value : {
                  name: '',
                  description: '',
                  lat: '',
                  lon: ''
                }}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions.resetForm)
                  setTimeout(() => {
                    actions.setSubmitting(false)
                  }, 500)
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .matches(
                      /^(?=.*).{1,50}\S$/, 'В названии поста должно быть более одного символа.'
                    )
                    .required('Пожалуйста заполните название поста'),
                  description: Yup.string()
                    .required('Пожалуйста заполните описание поста.'),
                  lat: Yup.string()
                    .matches(
                      /^(?=.*[0-9])(?=.*?[.]).{1,10}\S$/, 'Долгота должна содержать цифры, и символ точка.'
                    )
                    .required(
                      'Пожалуйста заполните валидную долготу.'
                    ),
                  lon: Yup.string()
                    .matches(
                      /^(?=.*[0-9])(?=.*?[.]).{1,10}\S$/, 'Долгота должна содержать цифры, и символ точка.'
                    )
                    .required(
                      'Пожалуйста заполните валидную широту.'
                    ),
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
              className={styles.input} name='name' label="Название"
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
              onBlur={handleBlur}
              required = {true}
            />
            </div>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Описание</div><TextField
              variant={'outlined'}
              className={styles.input} name='description' label="Описание"
              value = {values.description} onChange={handleChange}
              error={
                errors.description && touched.description
                  ? true
                  : false
              }
              helperText={
                errors.description && errors.description
              }
              onBlur={handleBlur}
              required = {true}
            />
            </div>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Широта</div><TextField
              variant={'outlined'}
              className={styles.input} name='lat' label="Широта"
              value = {values.lat} onChange={handleChange}
              required = {true}
              error={
                errors.lat && touched.lat
                  ? true
                  : false
              }
              helperText={
                (errors.lat && touched.lat)
                  && errors.lat
              }
              onBlur={handleBlur}
            />
            </div>
            <div className={styles['form-line']}>
              <div className={styles['description-title']}>Долгота</div><TextField
              variant={'outlined'}
              className={styles.input} name='lon' label="Долгота"
              value = {values.lon} onChange={handleChange}
              required = {true}
              helperText={
                (errors.lon && touched.lon)
                && errors.lon
              }
              error={
                errors.lon && touched.lon
                  ? true
                  : false
              }
              onBlur={handleBlur}
            />
            </div>
            <hr/>
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
              onClick={() => history.push('/settings/posts')}
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
      </div>
      </div>
    </div>
  )
}
