import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import classNames from 'classnames';
import { storage, db } from '../../../firebase/firebase';
import styles from './EditProfile.module.css';

import placeholder from './placeholder.png';

// import ProfilePicture from "./UploadProfilePicture";

// <FormGroup>
//   <Label for="ProfilePicture">Profile Picture</Label>
//   <ProfilePicture uid={uid} />
// </FormGroup>
// <FormGroup>
//   <Label for="ProfilePicture">Profile Picture</Label>
//   <ProfilePicture />
// </FormGroup>

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { working: false, picture: props.profile.profilepicture };
  }

  handleRemovePicture = async () => {
    const { uid } = this.props;
    console.log('entered');
    try {
      const pictureRef = storage.ref(`images/users/${ uid }/profile`);
      await pictureRef.delete();
    } catch (error) {
      console.log(error);
      // if error.code === "storage/object-not-found" { do X }
    }
    const userRef = db.collection('users').doc(uid);
    await userRef.set({ profilepicture: null }, { merge: true });
    this.setState({ picture: null });
  };

  handleUploadPicture = async (event) => {
    const { uid } = this.props;
    // upload and overwrite
    const pictureRef = storage.ref(`images/users/${ uid }/profile`);
    const file = event.target.files[0];
    await this.setState({ working: true });
    await pictureRef.put(file);
    const pictureURL = await pictureRef.getDownloadURL();
    const userRef = db.collection('users').doc(uid);
    await userRef.set({ profilepicture: pictureURL }, { merge: true });
    this.setState({ picture: pictureURL, working: false });
  };

  render() {
    const { picture, working } = this.state;
    const { saveChanges, profile, onEditChange, onCancel } = this.props;
    return (
      <div>
        <div className={styles.pictureFlex}>
          <img src={picture || placeholder} alt="Profile" className={styles.picture} />
          <span
            className={classNames(styles.pictureFlexItem, styles.removePicture)}
            onClick={this.handleRemovePicture}
          >
            Remove
          </span>
          <input
            type="file"
            accept="image/*"
            className={classNames(styles.pictureFlexItem, styles.uploadNewPicture)}
            onChange={this.handleUploadPicture}
            placeholder="Upload new"
          />
          {/* "spinner" */}
          <span className={classNames(styles.pictureFlexItem, styles.spinner)}>
            {working ? 'Uploading...' : null}
          </span>
        </div>

        <Form>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input id="full_name" value={profile.full_name} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="graduation">Graduation</Label>
            <Input id="graduation" value={profile.graduation} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="university">College</Label>
            <Input id="university" value={profile.university} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="major">Major</Label>
            <Input id="major" value={profile.major} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="headline">Bio</Label>
            <Input type="textarea" id="headline" value={profile.headline} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="skills">Skills</Label>
            <Input type="textarea" id="skills" value={profile.skills} onChange={onEditChange} />
          </FormGroup>
          <FormGroup>
            <Label for="courses">Relevant Courses</Label>
            <Input type="textarea" id="courses" value={profile.courses} onChange={onEditChange} />
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
