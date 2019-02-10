import React, {Component} from 'react';
import {auth} from '../../firebase'
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
    }

    handlePassword = () => {
        if(this.state.email.length > 0) {
            auth.passwordResetEmail(this.state.email);
        }
    }

    render () {
        return(
            <div style={{ maxWidth: 400 }} className="resetpassword">
              <h2> Reset Password </h2>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="SignInEmail">Enter email</Label>
                  <br></br>
                  <Input
                    autoComplete="username"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                  />
                </FormGroup>
                <Button outline color="primary" onClick = {this.handlePassword}>
                  Send Reset Email
                </Button>
              </Form>
            </div>
        )
    }
}

export default ForgotPassword;
