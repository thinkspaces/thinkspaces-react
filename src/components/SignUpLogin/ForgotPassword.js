import React, { Component } from "react";
import { auth } from "../../firebase";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback
} from "reactstrap";

class ForgotPassword extends Component {
  state = {
    email: "",
    error: null,
    valid: false
  };

  resetPassword = async () => {
    const { email } = this.state;
    if (email.length > 0) {
      try {
        await auth.passwordResetEmail(email);
        this.setState({ valid: true, error: null });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    const { email, error, valid } = this.state;
    const isEnabled = email.length > 0;

    return (
      <div style={{ maxWidth: 400 }} className="resetpassword">
        <h2> Reset Password </h2>
        <Form>
          <FormGroup>
            <Label for="SignInEmail">Enter email</Label>
            <Input
              autoComplete="username"
              valid={valid}
              invalid={!!error}
              name="email"
              type="email"
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
            {error && <FormFeedback>{error}</FormFeedback>}
            {valid && <FormFeedback valid={valid}>Email Sent!</FormFeedback>}
          </FormGroup>
          <Button
            outline
            color="primary"
            disabled={!isEnabled}
            onClick={this.resetPassword}
          >
            Send Reset Email
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;
