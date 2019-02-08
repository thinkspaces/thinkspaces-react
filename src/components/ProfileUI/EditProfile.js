import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ProfilePicture from "./UploadProfilePicture";

// <FormGroup>
//   <Label for="ProfilePicture">Profile Picture</Label>
//   <ProfilePicture uid={uid} />
// </FormGroup>

export default class EditProfile extends Component {
  render() {
    const { saveChanges, profile, onEditChange, onCancel, uid } = this.props;
    // console.log(uid);
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="full_name"
              value={profile.full_name}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
<<<<<<< HEAD
            <Label for="ProfilePicture">Profile Picture</Label>
            <ProfilePicture />
          </FormGroup>
          <FormGroup>
=======
>>>>>>> 7a45d1c43288999a46bb278298a47d1d0488e586
            <Label for="graduation">Graduation</Label>
            <Input
              id="graduation"
              value={profile.graduation}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="university">College</Label>
            <Input
              id="university"
              value={profile.university}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="major">Major</Label>
            <Input id="major" value={profile.major} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="headline">Bio</Label>
            <Input
              type="textarea"
              id="headline"
              value={profile.headline}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="skills">Skills</Label>
            <Input
              type="textarea"
              id="skills"
              value={profile.skills}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="courses">Relevant Courses</Label>
            <Input
              type="textarea"
              id="courses"
              value={profile.courses}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="interests">Interests</Label>
            <Input
              type="textarea"
              id="interests"
              value={profile.interests}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="privacy"
                checked={!profile.privacy}
                onChange={onEditChange}
              />
              Make your profile public and let projects find you
            </Label>
          </FormGroup>
        </Form>
        <br />
        <Button color="info" onClick={saveChanges} style={{ marginRight: 5 }}>
          Save
        </Button>
        <Button color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }
}
