// @flow

import axios from 'axios';

const file = '/src/libs/apiserver';

const checkUserNameUnique = async (userName: string) => {
  const func = 'checkUserNameUnique';

  try {
    const res = await axios.post('/api/signup_check/username', { userName });

    console.log({ file, func, userName, res });

    return res.data.result;
  } catch (error) {
    console.log({ file, func, userName, error });
  }

  return false;
};

const signin = async (userName: string, password: string) => {
  const res = await axios.post('/api/signin', { userName, password });

  console.log({ file, func: 'signin', userName, res });

  if (res.status !== 200) throw 'server error';

  if (res.data && res.data.error) throw res.data.error;

  return res.data.user;
};

const signup = async (userName: string, email: string, password: string) => {
  const res = await axios.post('/api/signup', { userName, email, password });

  console.log({ file, func: 'signup', userName, email, res });

  if (res.status !== 200) throw 'server error';

  if (res.data && res.data.error) throw res.data.error;

  return res.data.user;
};

const signout = async () => {
  const response = await axios.post('/api/signout', {});

  console.log({ file, func: 'signout', response });

  return response;
};

export default {
  checkUserNameUnique,
  signin,
  signup,
  signout,
};
