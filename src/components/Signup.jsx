// @flow

import React from 'react';

import { FormGroup, FormControl, Button } from 'react-bootstrap';

const file = '/src/components/Signup.jsx';

export type SignupProps = {
  onSubmit: (string, string) => void,
}

const Signup = (props: SignupProps) => {
  const { onSubmit } = props;
  let userName;
  let password1;
  let password2;

  const handleSubmit = () => {
    console.log({ file, func: 'handleSubmit', userName, password1, password2 });
    if (userName.length < 4 || password1.length < 8 || password1 !== password2) return;

    onSubmit(userName, password1);
  };

  const handleUserNameChange = (e) => {
    userName = e.target.value;
  };

  const handlePassword1Change = (e) => {
    password1 = e.target.value;
  };

  const handlePassword2Change = (e) => {
    password2 = e.target.value;
  };

  return (
    <div>
      <FormGroup>
        <h5>Username</h5>
        <FormControl type="text" value={userName} placeholder="Enter unique user id"
          onChange={handleUserNameChange}
        />
        <h5>Password</h5>
        <FormControl type="password" value={password1} placeholder=""
          onChange={handlePassword1Change} />
        <h5>Password confirmation</h5>
        <FormControl type="password" value={password2} placeholder=""
          onChange={handlePassword2Change} />
        <br/>
        <Button bsStyle="primary" onClick={handleSubmit} block>
          Register
        </Button>
      </FormGroup>
    </div>
  );
};

export default Signup;
