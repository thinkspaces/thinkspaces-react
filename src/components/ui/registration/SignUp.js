import React, { Component } from "react";

import { auth, db } from "../../../firebase";

import { withRouter } from "react-router-dom";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback
} from "reactstrap";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    full_name: "",
    graduation: "",
    preferred_name: "",
    privacy: false,
    profilepicture: "",
    headline: ""
  };

  createProfile = async event => {
    event.preventDefault();

    const {
      email,
      password,
      full_name,
      graduation,
      preferred_name,
      privacy,
      profilepicture,
      headline
    } = this.state;

    const { history } = this.props;

    try {
      let response = await auth.createUser(email, password);
      if (response) {
        this.setState({ email: "", password: "", error: null });
        await response.user.updateProfile({ displayName: preferred_name });
        await db.createUserwithFields(response.user.uid, {
          full_name,
          graduation,
          preferred_name,
          email,
          privacy,
          headline,
          profilepicture
        });

        this.setState({
          email: "",
          password: "",
          error: null,
          full_name: "",
          graduation: "",
          preferred_name: "",
          privacy: false,
          profilepicture: "",
          headline: ""
        });

        history.push("/");
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const {
      email,
      password,
      full_name,
      graduation,
      preferred_name,
      privacy,
      error,
      headline
    } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      full_name.length > 0 &&
      graduation.length > 0 &&
      preferred_name.length > 0 &&
      headline.length > 0;
    return (
      <div>
        <h2> Sign Up </h2>
        <Form onSubmit={this.createProfile}>
          <FormGroup>
            <Label for="full_name">Full Name</Label>
            <Input
              name="full_name"
              type="text"
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
            <Label for="headline">Short Bio</Label>
            <Input
              type="headline"
              value={headline}
              onChange={event =>
                this.setState({ headline: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpEmail">Email</Label>
            <Input
              autoComplete="email"
              type="email"
              name="email"
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpPassword">Password</Label>
            <Input
              invalid={!!error}
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            <FormFeedback>{error}</FormFeedback>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="privacy"
                checked={!privacy}
                onChange={event =>
                  this.setState({ privacy: !event.target.checked })
                }
              />
              Make your profile public and let projects find you
            </Label>
          </FormGroup>
          <Button
            style={{ marginTop: 10 }}
            disabled={!isEnabled}
            color="danger"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignUp);
