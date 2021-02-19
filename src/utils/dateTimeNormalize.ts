import moment from 'moment';

export const dateTimeNormalize = (time:any) => {
  let offset = -(new Date().getTimezoneOffset()/60);
  let date = moment(time).utc();
  return date.utcOffset(offset).format("YYYY-MM-DD HH:mm:ss");
}
