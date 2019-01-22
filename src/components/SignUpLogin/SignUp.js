import React, { Component } from "react";

import { auth, db } from "../../firebase";

import { withRouter } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: false,
    full_name: "",
    graduation: "",
    preferred_name: ""
  };

  handleSubmit = event => {
    const {
      email,
      password,
      full_name,
      graduation,
      preferred_name
    } = this.state;

    const { history } = this.props;

    auth
      .createUser(email, password)
      .then(response => {
        this.setState({ email: "", password: "", error: false });

        db.createUserwithFields(
          response.user.uid,
          full_name,
          graduation,
          preferred_name,
          email
        ).then(() => {
          this.setState({
            full_name: "",
            preferred_name: "",
            graduation: "",
            email: ""
          });
          history.push("/");
        });
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      full_name,
      graduation,
      preferred_name
    } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      full_name.length > 0 &&
      graduation.length > 0 &&
      preferred_name.length > 0;
    return (
      <div>
        <h2> Sign Up </h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="full_name">Full Name</Label>
            <Input
              type="full_name"
              value={full_name}
              onChange={event =>
                this.setState({ full_name: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="preferred_name">Preferred Name</Label>
            <Input
              type="preferred_name"
              value={preferred_name}
              onChange={event =>
                this.setState({ preferred_name: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="graduation">Graduation Year</Label>
            <Input
              type="graduation"
              value={graduation}
              onChange={event =>
                this.setState({ graduation: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpEmail">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpPassword">Password</Label>
            <Input
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

export default withRouter(SignUp);
