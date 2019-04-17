import React from 'react';
import { Formik, FormikActions, FormikProps } from 'formik';
import { history, routeIncludes, getRouteQueryParams } from '../../history';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions/login-action';
import _ from 'lodash';
import classnames from 'classnames';

import styles from './Login.module.scss';
import { axios } from '../../App';

interface LoginValues {
  username: string;
  password: string;
  submit: string | undefined;
}

interface LoginProps {
  loginAction: Function;
}

const Login = ({ loginAction }: LoginProps) => (
  <Formik<any, LoginValues>
    initialValues={{
      username: '',
      password: '',
      submit: undefined
    }}
    onSubmit={(
      values: LoginValues,
      { setSubmitting, setErrors }: FormikActions<LoginValues>
    ) => {
      const isLogin = routeIncludes('/login');

      if (isLogin) {
        axios
          .post('/login', values)
          .then(res => setSubmitting(false))
          .catch(err => {
            setSubmitting(false);

            setErrors({
              submit: 'Username and password did not match any accounts.'
            });
          });
      } else {
        axios
          .post('/register', values)
          .then(res => setSubmitting(false))
          .catch(err => {
            setSubmitting(false);

            setErrors({
              submit: 'This email already has an account.'
            });
          });
      }
    }}
    render={({
      values,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting
    }: FormikProps<LoginValues>) => {
      axios.get('/auth/token').then(res => {
        const { token } = res.data;

        if (token) {
          loginAction(token);
          history.push('/profile');
        }
      });

      const isLogin = routeIncludes('login');
      const isLoginFailed = getRouteQueryParams('failed');

      let loginSwitch;

      if (isLogin) {
        loginSwitch = (
          <div className={styles['login-switch-container']}>
            Don't have an account?
            <a href="/register" className="link red">
              Sign up →
            </a>
          </div>
        );
      } else {
        loginSwitch = (
          <div className={styles['login-switch-container']}>
            Have an account?
            <a href="/login" className="link red">
              Log in →
            </a>
          </div>
        );
      }

      return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
          <h1 className={styles['login-header']}>
            {isLogin ? 'Welcome' : 'Hello'}
            <br />
            {isLogin ? 'Back!' : 'There!'}
          </h1>
          <div>
            <label htmlFor="username"> Username or Email </label>
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Your Email"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Your Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {errors.submit && (
            <div className={styles['login-error']}>{errors.submit}</div>
          )}
          {isLoginFailed && (
            <div className={styles['login-error']}>Login was unsuccessful.</div>
          )}
          <button
            className={classnames('btn', styles['password-auth'])}
            type="submit"
            disabled={isSubmitting}
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>

          <div className={styles['auth-divider']}> Or </div>

          <a
            className={classnames('btn', styles['facebook-auth'])}
            href="/auth/facebook"
          >
            {isLogin ? 'Log In' : 'Sign Up'} with Facebook
          </a>
          <a
            className={classnames('btn', styles['google-auth'])}
            href="/auth/google"
          >
            {isLogin ? 'Log In' : 'Sign Up'} with Google
          </a>
          {loginSwitch}
        </form>
      );
    }}
  />
);

export default connect(
  null,
  { loginAction }
)(Login);
