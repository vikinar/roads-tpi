import styles from './Status.module.scss'

export const Status = (status:any) => {
  switch (status) {
    case 'SUCCESS': return styles.success;
      break;
    case 'ERROR': return styles.danger;
      break;
    case 'WARNING': return styles.warning;
      break;
    case 'UNKNOWN': return styles.unknown;
      break;
    case 'OFFLINE': return styles.offline;
      break;
    default: return styles.success
  }
}
