// @flow

import React from 'react';

import {
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

export type SignupProps = {
  onSubmit: (string, string, string) => void,
}

type State = {
  submitable: boolean,
  userNameValid: ?string,
  emailValid: ?string,
  passwordValid: ?string,
}

const hasNumber = str => /\d/.test(str);
const hasAlphabet = str => /[a-zA-Z]/.test(str);
const isValidEmailForm = str => /.+@.+\..+/.test(str);

export class Signup extends React.Component<SignupProps, State> {
  userName: string;
  email: string;
  password: string;
  handleSubmit: () => void;
  handleUserNameChange: (SyntheticEvent<HTMLInputElement>) => void;
  handleEmailChange: (SyntheticEvent<HTMLInputElement>) => void;
  handlePasswordChange: (SyntheticEvent<HTMLInputElement>) => void;

  constructor(props: SignupProps) {
    super(props);
    this.state = {
      submitable: false,
      userNameValid: null,
      emailValid: null,
      passwordValid: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.userName = '';
    this.email = '';
    this.password = '';
  }

  handleSubmit() {
    this.props.onSubmit(this.userName, this.email, this.password);
  }

  updateButton(valid: {
    userNameValid?: ?string,
    passwordValid?: ?string,
  }) {
    const valids = Object.assign({}, {
      userNameValid: this.state.userNameValid,
      emailValid: this.state.emailValid,
      passwordValid: this.state.passwordValid,
    }, valid);

    const submitable = valids.userNameValid === 'success'
      && valids.emailValid === 'success'
      && valids.passwordValid === 'success';

    this.setState({ submitable });
  }

  handleUserNameChange(e: SyntheticEvent<HTMLInputElement>) {
    this.userName = e.currentTarget.value;

    const isEmpty = this.userName.length === 0;
    const valid = this.userName.length >= 3;

    const userNameValid = isEmpty ? null : valid ? 'success' : 'error';

    this.setState({ userNameValid });
    this.updateButton({ userNameValid });
  }

  handleEmailChange(e: SyntheticEvent<HTMLInputElement>) {
    this.email = e.currentTarget.value;

    const isEmpty = this.email.length === 0;
    const valid = isValidEmailForm(this.email);

    const emailValid = isEmpty ? null : valid ? 'success' : 'error';

    this.setState({ emailValid });
    this.updateButton({ emailValid });
  }
  handlePasswordChange(e: SyntheticEvent<HTMLInputElement>) {
    this.password = e.currentTarget.value;

    const isEmpty = this.password.length === 0;
    const valid = this.password.length > 7
      && hasNumber(this.password)
      && hasAlphabet(this.password);

    const passwordValid = isEmpty ? null : valid ? 'success' : 'error';

    this.setState({ passwordValid });
    this.updateButton({ passwordValid });
  }

  render() {
    return (
      <div>
        <br/>
        <FormGroup validationState={this.state.userNameValid}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter unique user id"
            onChange={this.handleUserNameChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Use at least three characters.</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.emailValid}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            placeholder="you@example.com"
            onChange={this.handleEmailChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState={this.state.passwordValid}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="Create a password"
            onChange={this.handlePasswordChange} />
          <FormControl.Feedback />
          <HelpBlock>Use at least one letter, one numeral, and seven characters.</HelpBlock>
        </FormGroup>
        <br/>
        <Button bsStyle="primary"
          onClick={this.handleSubmit}
          disabled={!this.state.submitable}
          block
        >
          Register
        </Button>
      </div>
    );
  }
}

export default Signup;
