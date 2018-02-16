// @flow

import React from 'react';

import Signin from './Signin';
import Signup from './Signup';
import { Tabs, Tab, Col } from 'react-bootstrap';

const file = '/src/components/Signinup.jsx';

export type SigninupProps = {
  onSigninSubmit: (string, string) => void,
  onSignupSubmit: (string, string) => void,
}

const Signinup = (props: SigninupProps) => {
  const { onSigninSubmit, onSignupSubmit } = props;

  console.log({ file, func: 'Signinup' });

  return (
    <div>
      <Col sm={6} md={4} lg={4} smOffset={3} mdOffset={4} lgOffset={4}>
        <Tabs defaultActiveKey={1} id="singinup">
          <Tab eventKey={1} title="Sign in">
            <Signin onSubmit={onSigninSubmit} />
          </Tab>
          <Tab eventKey={2} title="Register">
            <Signup onSubmit={onSignupSubmit} />
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
};

export default Signinup;
