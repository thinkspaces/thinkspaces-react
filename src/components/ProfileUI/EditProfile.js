import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class EditProfile extends Component {
  render() {
    const { saveChanges, profile, onEditChange, onCancel } = this.props;
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
            <Label for="graduation">Graduation</Label>
            <Input
              id="graduation"
              value={profile.graduation}
              onChange={onEditChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="university">University</Label>
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
        </Form>
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
