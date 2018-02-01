// @flow

import React from 'react';

import { FormGroup, FormControl, Button } from 'react-bootstrap';

export type SigninProps = {
  onSubmit: (string, string) => void,
}

const Signin = (props: SigninProps) => {
  const { onSubmit } = props;
  let userName;
  let password;

  const handleSubmit = () => {
    onSubmit(userName, password);
  };

  const handleUserIdChange = (e) => {
    userName = e.target.value;
  };

  const handlePasswordChange = (e) => {
    password = e.target.value;
  };

  return (
    <div>
      <FormGroup>
        <h5>Username</h5>
        <FormControl type="text" value={userName} placeholder=""
          onChange={handleUserIdChange} />
        <h5>Password</h5>
        <FormControl type="password" value={password} placeholder=""
          onChange={handlePasswordChange} />
        <br/>
        <Button bsStyle="success" onClick={handleSubmit} block>Signin</Button>
      </FormGroup>
    </div>
  );
};

export default Signin;
