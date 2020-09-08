// Libraries
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// Utilities
import { db, storage } from "../../../../firebase";

// Styles
import "./styles.css";

// Assets
import placeholder from "./placeholder.png";

const ProfileImageInput = ({
  picture,
  handleRemovePicture,
  handleUploadPicture,
  working,
}) => (
  <div className="pictureFlex">
    <img src={picture || placeholder} alt="Profile" className="picture" />
    <button
      type="button"
      className="pictureFlexItem removePicture"
      onClick={handleRemovePicture}
    >
      Remove
    </button>
    <input
      type="file"
      accept="image/*"
      className="pictureFlexItem uploadNewPicture"
      onChange={handleUploadPicture}
      placeholder="Upload new"
    />
    <span className="pictureFlexItem spinner">
      {working ? "Uploading..." : null}
    </span>
  </div>
);

const EditForm = ({ saveChanges, profile, onEditChange, onCancel }) => (
  <>
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
            checked={profile.privacy.visibleInSearch}
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
  </>
);

export default class EditProfile extends Component {
  state = { working: false };

  handleRemovePicture = async () => {
    const { uid, onPictureChange } = this.props;
    await storage.removeProfileImage(uid);
    await db.update("users")(uid)({ profilepicture: "" });
    onPictureChange("");
  };

  handleUploadPicture = async (event) => {
    const {
      target: { files },
    } = event;
    const { uid, onPictureChange } = this.props;

    // upload and overwrite
    const file = files[0];
    this.setState({ working: true });
    const profileURL = await storage.uploadProfileImage(uid, file);
    await db.update("users")(uid)({ profilepicture: profileURL });
    onPictureChange(profileURL);
    this.setState({ working: false });
  };

  render() {
    const { working } = this.state;
    const { saveChanges, profile, onEditChange, onCancel } = this.props;
    return (
      <div>
        <ProfileImageInput
          picture={profile.profilepicture}
          working={working}
          handleUploadPicture={this.handleUploadPicture}
          handleRemovePicture={this.handleRemovePicture}
        />
        <EditForm
          saveChanges={saveChanges}
          profile={profile}
          onEditChange={onEditChange}
          onCancel={onCancel}
        />
      </div>
    );
  }
}
