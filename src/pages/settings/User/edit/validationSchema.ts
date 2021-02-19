import * as Yup from 'yup';
import { regEx } from '../../../../utils/regEx';

export const validationSchema = Yup.object().shape({
  login: Yup.string()
    .matches(
      regEx.string, 'В логине пользователя должно быть более одного символа.'
    )
    .required('Пожалуйста заполните логин для пользователя.'),
  email: Yup.string()
    .required('Пожалуйста заполните Email пользователя.')
    .matches(
      regEx.email,
      'Введите валидный Email.'
    ),
  firstName: Yup.string()
    .matches(
      regEx.string, 'В имени пользователя должно быть более одного символа.'
    )
    .required('Пожалуйста заполните имя пользователя.'),
  lastName: Yup.string()
    .matches(
      regEx.string, 'В фамилии пользователя должно быть более одного символа.'
    )
    .required('Пожалуйста заполните фамилию пользователя.'),
  middleName: Yup.string()
    .matches(
      regEx.string, 'В отчестве пользователя должно быть более одного символа.'
    )
    .required('Пожалуйста заполните отчество пользователя.')
})
