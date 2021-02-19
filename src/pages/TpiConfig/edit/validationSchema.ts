import * as Yup from 'yup';
import { regEx } from '../../../utils/regEx';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      regEx.string, 'В названии конфигурации должно быть более одного символа.'
    )
    .required('Пожалуйста заполните название конфигурации.'),
  description: Yup.string()
    .matches(
      regEx.longString, 'В комметарии конфигурации должно быть более одного символа.'
    )
    .required('Пожалуйста заполните комметарий конфигурации.'),
  width: Yup.string()
    .matches(
      regEx.onlyNumbers, 'Ширина может быть задана только в числовых значениях.'
    ),
  height: Yup.string()
    .matches(
      regEx.onlyNumbers, 'Высота может быть задана только в числовых значениях.'
    ),
  pageDurationMin: Yup.string()
    .matches(
      regEx.onlyNumbers, 'Мин. длительность сообщениния может быть задана только в числовых значениях.'
    ),
  pageDurationMax: Yup.string()
    .matches(
      regEx.onlyNumbers, 'Макс. длительность сообщениния может быть задана только в числовых значениях.'
    )
})
