import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Button, FormGroup, Label, Input, Form, FormFeedback } from 'reactstrap';
import { auth } from '../../../firebase';

class Login extends Component {
  state = { email: '', password: '', error: null };

  loginUser = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    try {
      await auth.signInUser(email, password);
      this.setState({ email: '', password: '', error: null });
      history.push('/');
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { email, password, error } = this.state;
    const { match } = this.props;
    const isEnabled = email.length > 0 && password.length > 0;

    return (
      <div className="login">
        <h2> Login </h2>
        <Form onSubmit={this.loginUser}>
          <FormGroup>
            <Label for="SignInEmail">Email</Label>
            <Input
              autoComplete="username"
              name="email"
              type="email"
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignInPassword">Password</Label>
            <Input
              invalid={!!error}
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={event => this.setState({ password: event.target.value })}
            />
            <FormFeedback>{error}</FormFeedback>
          </FormGroup>
          <Button disabled={!isEnabled} color="danger">
            Submit
          </Button>
          <Link style={{ marginLeft: 10 }} to={`${ match.url }/forgotpassword`}>
            Forgot password?
          </Link>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
