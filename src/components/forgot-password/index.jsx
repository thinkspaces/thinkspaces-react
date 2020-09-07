import React, { Component } from "react";
import { FormGroup, Label, Input, Form } from "reactstrap";
import Button from "../shared/button";
import { auth } from "../../firebase";

class ForgotPassword extends Component {
  state = { email: "" };

  handlePassword = () => {
    const { email } = this.state;
    if (email.length > 0) {
      auth.passwordResetEmail(email);
    }
  };

  render() {
    const { email } = this.state;
    return (
      <div style={{ maxWidth: 400 }} className="resetpassword">
        <h2> Reset Password </h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="SignInEmail">Enter email</Label>
            <br />
            <Input
              autoComplete="username"
              name="email"
              type="email"
              value={email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <Button onClick={this.handlePassword}>Send Reset Email</Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;
