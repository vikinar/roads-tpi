import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import { HeaderPanel } from '../../components/HeaderPanel';
import { useHistory } from 'react-router-dom';
import { Paper } from '../../components/Paper';
import styles from './LoginPage.module.scss';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../store/modules/login/loginSlice';
import { setAuth } from '../../store/modules/auth';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const changePassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value);
  };

  const changeLogin = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginValue(e.currentTarget.value);
  };

  const handleClick = async () => {
    // if (password !== '1') {
    //   setHasError(!hasError);
    // } else {
    //   history.push('/map');
    // }
    const response: any = await dispatch(
      loginRequest({
        login: loginValue,
        password,
      }),
    );

    if (!response.payload.error) {
      dispatch(setAuth(true));
      history.push('/map');
    } else {
      setHasError(true);
    }
  };

  return (
    <div>
      <HeaderPanel title="Название системы" />
      <div className={styles.content}>
        <div className={styles.title}>Введите логин и пароль</div>
        {/* <div className={styles.block}> */}
        <Paper className={styles.block}>
          <div className={styles.main}>
            <div className={styles.field}>
              <span>Логин</span>
              <Input value={loginValue} onChange={changeLogin} className={styles.input}></Input>
            </div>
            <div className={styles.field}>
              <span>Пароль</span>
              {/* <Input type="password" value={password} onChange={changePassword} className={styles.input}></Input> */}
              {hasError ? (
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={changePassword}
                    className={styles.input}
                    error
                  ></Input>
                  <div className={styles.error}> Неверный пароль </div>
                </div>
              ) : (
                <Input type="password" value={password} onChange={changePassword} className={styles.input}></Input>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <span>Забыли пароль ?</span>
            <Button variant="contained" title="Войти" onClick={handleClick}>
              Войти
            </Button>
          </div>
        </Paper>
        {/* </div> */}
      </div>
    </div>
  );
};
