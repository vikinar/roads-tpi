import * as Yup from 'yup';
import { regEx } from '../../../../utils/regEx';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Пожалуйста заполните пароль для внешней системы.'),
  name: Yup.string()
    .matches(
      regEx.string, 'В названии внешней системы должно быть более одного символа.'
    )
    .required('Пожалуйста заполните название внешней системы пользователя.'),
  description: Yup.string()
    .matches(
      regEx.longString, 'В описании внешней системы должно быть более одного символа.'
    )
    .required('Пожалуйста заполните описание внешней системы.'),
})
