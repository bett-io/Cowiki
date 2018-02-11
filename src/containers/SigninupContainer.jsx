// @flow

import React from 'react';

import Signinup from '../components/Signinup';
import apiserver from '../libs/apiserver';
import connectWithRouter from '../../modules/connectWithRouter';
import { updateUser } from '../actions/user';

const file = '/src/containers/SigninupContainer';

const SigninupContainer = (props) => {
  console.log ({ file, func: 'SigninupContainer' });

  const { onSigninSubmit, onSignupSubmit, history } = props;

  const newSigninSubmit = (userName, password) => onSigninSubmit(userName, password, history);
  const newSignupSubmit = (userName, email, password) => onSignupSubmit(
    userName,
    email,
    password,
    history,
  );
  const newProps = Object.assign({}, props, {
    onSigninSubmit: newSigninSubmit,
    onSignupSubmit: newSignupSubmit,
  });

  return (<Signinup {...newProps} />);
};

const signin = (userName: string, password: string, history: Object) => async (dispatch) => {
  const func = 'signin';

  console.log({ file, func, userName });

  try {
    const user = await apiserver.signin(userName, password);

    dispatch(updateUser(user));
  } catch (error) {
    // TODO handle error responses such as 'unregistered username' or 'password mismatch'.
    console.log({ file, func, error });
  }

  history.push('/');
};

const signup = (userName: string, email: string, password: string, history: Object) => async (
  dispatch,
) => {
  const func = 'signup';

  console.log({ file, func, userName, email });

  try {
    const user = await apiserver.signup(userName, email, password);

    dispatch(updateUser(user));
  } catch (error) {
    // TODO handle error responses such as 'unregistered username' or 'password mismatch'.
    console.log({ file, func, error });
  }

  history.push('/');
};

const mapDispatchToProps = dispatch => ({
  onSigninSubmit: (userName, password, history) => dispatch(signin(userName, password, history)),
  onSignupSubmit: (userName, email, password, history) => dispatch(signup(
    userName,
    email,
    password,
    history,
  )),
});

export default connectWithRouter(
  null,
  mapDispatchToProps,
)(SigninupContainer);
