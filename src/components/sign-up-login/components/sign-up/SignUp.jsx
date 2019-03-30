/* eslint camelcase: 0, no-param-reassign: 0, max-len: 0 */
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form, FormFeedback } from 'reactstrap';
import FinishProfileModal from '../finish-profile-modal';
import { auth, db } from '../../../../firebase';

class SignUp extends Component {
  state = { modal: false,
    profile: { email: '',
      password: '',
      full_name: '',
      graduation: '',
      preferred_name: '',
      privacy: false,
      headline: '',
      major: '',
      university: '' },
    error: null,
    uid: '' };

  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }));

  onCloseFinish = async (event) => {
    event.preventDefault();
    const { profile, uid } = this.state;
    const { history } = this.props;
    delete profile.password;
    await db.createUserwithFields(uid, profile);

    history.push('/');
  };

  onValueChange = ({ target: { id, checked, type, value } }) => {
    if (type === 'checkbox') {
      value = !checked;
    }
    this.setState(prevState => ({ profile: { ...prevState.profile, [id]: value } }));
  };

  createProfile = async (event) => {
    event.preventDefault();
    const { profile } = this.state;

    try {
      const response = await auth.createUser(profile.email, profile.password);
      if (response) {
        this.setState({ uid: response.user.uid });
        await response.user.updateProfile({ displayName: profile.full_name.replace(/ .*/, '') });
        this.toggle();
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { modal, profile, error } = this.state;
    const isEnabled = profile.email.length > 0 && profile.password.length > 0 && profile.full_name.length > 0;
    return (
      <div>
        <h2> Sign Up </h2>
        <Form>
          <FormGroup>
            <Label for="full_name">Full Name</Label>
            <Input id="full_name" value={profile.full_name} onChange={this.onValueChange} />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpEmail">Email</Label>
            <Input
              autoComplete="email"
              type="email"
              id="email"
              value={profile.email}
              onChange={this.onValueChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="SignUpPassword">Password</Label>
            <Input
              invalid={!!error}
              autoComplete="current-password"
              id="password"
              type="password"
              value={profile.password}
              onChange={this.onValueChange}
            />
            <FormFeedback>{error}</FormFeedback>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="privacy"
                checked={!profile.privacy}
                onChange={this.onValueChange}
              />
              Make your profile public and let projects find you
            </Label>
          </FormGroup>
          <FinishProfileModal
            isOpen={modal}
            toggle={this.toggle}
            onClose={this.onCloseFinish}
            profile={profile}
            onChange={this.onValueChange}
          />
          <Button
            onClick={this.createProfile}
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
