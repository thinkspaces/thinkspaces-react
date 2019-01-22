import React, { Component } from "react";

import { auth } from "../../firebase";

import { withRouter } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  handleSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .signInUser(email, password)
      .then(response => {
        this.setState({ email: "", password: "", error: false });
        console.log(response);
        history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0;

    return (
      <div className="login">
        <h2> Login </h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="SignInEmail">Email</Label>
            <Input
              autoComplete="username"
              type="email"
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignInPassword">Password</Label>
            <Input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </FormGroup>
          <Button disabled={!isEnabled} color="danger">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
