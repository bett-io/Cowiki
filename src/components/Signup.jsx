// @flow

import React from 'react';

import {
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

const file = '/src/components/Signup.jsx';

export type SignupProps = {
  onSubmit: (string, string, string) => void,
  checkUserNameUnique: (string) => Promise<boolean>,
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
  userNameCheckTimer: number;
  email: string;
  password: string;
  handleSubmit: () => void;
  handleUserNameChange: (SyntheticEvent<HTMLInputElement>) => void;
  handleEmailChange: (SyntheticEvent<HTMLInputElement>) => void;
  handlePasswordChange: (SyntheticEvent<HTMLInputElement>) => void;
  checkUserNameUnique: (string) => Promise<boolean>;

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
    this.checkUserNameUnique = this.checkUserNameUnique.bind(this);

    this.userName = '';
    this.userNameCheckTimer = 0;
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

  updateStateAndButton(valid: {
    userNameValid?: ?string,
    passwordValid?: ?string,
  }) {
    this.setState(valid);
    this.updateButton(valid);
  }

  checkUserNameUnique() {
    const func = 'checkUserNameUnique';

    this.updateStateAndButton({ userNameValid: null });

    this.props.checkUserNameUnique(this.userName)
      .then((result) => {
        console.log({ file, func, result });

        this.updateStateAndButton({ userNameValid: result ? 'success' : 'warning' });
      })
      .catch((error) => {
        console.log({ file, func, error });

        this.updateStateAndButton({ userNameValid: 'success' });
      });
  }

  handleUserNameChange(e: SyntheticEvent<HTMLInputElement>) {
    this.userName = e.currentTarget.value;

    const isEmpty = this.userName.length === 0;
    if (isEmpty) {
      this.updateStateAndButton({ userNameValid: null });
      return;
    }

    const valid = this.userName.length >= 3;
    if (!valid) {
      this.updateStateAndButton({ userNameValid: 'error' });
      return;
    }

    clearTimeout(this.userNameCheckTimer);
    this.userNameCheckTimer = setTimeout(this.checkUserNameUnique, 300);
  }

  handleEmailChange(e: SyntheticEvent<HTMLInputElement>) {
    this.email = e.currentTarget.value;

    const isEmpty = this.email.length === 0;
    const valid = isValidEmailForm(this.email);

    const emailValid = isEmpty ? null : valid ? 'success' : 'error';

    this.updateStateAndButton({ emailValid });
  }
  handlePasswordChange(e: SyntheticEvent<HTMLInputElement>) {
    this.password = e.currentTarget.value;

    const isEmpty = this.password.length === 0;
    const valid = this.password.length > 7
      && hasNumber(this.password)
      && hasAlphabet(this.password);

    const passwordValid = isEmpty ? null : valid ? 'success' : 'error';

    this.updateStateAndButton({ passwordValid });
  }

  createUserNameHelpBlock(userNameValid: ?string) {
    if (userNameValid === 'error') return (<HelpBlock>Use at least three characters.</HelpBlock>);
    if (userNameValid === 'warning') return (<HelpBlock>Username is already taken.</HelpBlock>);
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
          { this.createUserNameHelpBlock(this.state.userNameValid) }
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
