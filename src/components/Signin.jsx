// @flow

import React from 'react';

import { FormGroup, FormControl, Button } from 'react-bootstrap';

export type SigninProps = {
  onSubmit: (string, string) => void,
}

export type State = {
  submitable: boolean,
}

export class Signin extends React.Component<SigninProps, State> {
  userName: string;
  password: string;
  handleSubmit: () => void;
  handleUserIdChange: (SyntheticEvent<HTMLInputElement>) => void;
  handlePasswordChange: (SyntheticEvent<HTMLInputElement>) => void;

  constructor(props: SigninProps) {
    super(props);
    this.state = {
      submitable: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.userName = '';
    this.password = '';
  }

  handleSubmit(e: SyntheticEvent<HTMLInputElement>) {
    e.preventDefault();
    this.props.onSubmit(this.userName, this.password);
  }

  updateButton() {
    const submitable = this.userName.length > 3 && this.password.length > 0;
    this.setState({ submitable });
  }

  handleUserIdChange(e: SyntheticEvent<HTMLInputElement>) {
    this.userName = e.currentTarget.value;
    this.updateButton();
  }

  handlePasswordChange(e: SyntheticEvent<HTMLInputElement>) {
    this.password = e.currentTarget.value;
    this.updateButton();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <h5>Username</h5>
          <FormControl type="text" placeholder=""
            onChange={this.handleUserIdChange} />
          <h5>Password</h5>
          <FormControl type="password" placeholder=""
            onChange={this.handlePasswordChange} />
          <br/>
          <Button
            bsStyle="success"
            type="submit"
            disabled={!this.state.submitable}
            block
          >
            Signin
          </Button>
        </FormGroup>
      </form>
    );
  }
}

export default Signin;
