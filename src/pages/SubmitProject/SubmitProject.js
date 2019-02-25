/* eslint camelcase: 0 */
import React, { Component } from 'react';

import FileUploader from 'react-firebase-file-uploader';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

import firebase from 'firebase/app';
import withAuthorization from '../../components/Authentication/withAuthorization';
import { db } from '../../firebase';

class SubmitProject extends Component {
  state = { title: '',
    contact: '',
    about: '',
    card_des: '',
    images: '',
    links: '',
    need: '',
    files: [],
    avatar: '',
    isUploading: false,
    progress: 0 };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('projectpictures')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        this.setState({ images: url });
      });
  };

  createProject = (event) => {
    event.preventDefault();
    const { title, contact, about, card_des, images, links, need } = this.state;
    const { history } = this.props;

    db.createProjectWithFields({ title,
      about,
      card_des,
      images: [ images ],
      contact,
      links: [ links ],
      need,
      shortname: title.replace(/\s+/g, '-') }).then(() => {
      this.setState({ title: '',
        contact: '',
        about: '',
        card_des: '',
        images: '',
        links: '',
        need: '' });
      history.push('/');
    });
  };

  render() {
    const { title,
      contact,
      about,
      card_des,
      links,
      need,
      isUploading,
      avatarURL,
      progress,
      images } = this.state;
    return (
      <div>
        <h2> Submit a Project </h2>
        <Form onSubmit={this.createProject}>
          <FormGroup>
            <Label for="title"> Project Name </Label>
            <Input value={title} onChange={event => this.setState({ title: event.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="contact"> Contact Email</Label>
            <Input
              value={contact}
              onChange={event => this.setState({ contact: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="projectpictures">Add some photos of your project!</Label>
            <FormGroup>
              {isUploading && <p>Progress: {progress}</p>}
              {avatarURL && <img src={images} alt="profile" width="50%" height="50%" />}
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref('projectpictures')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="card_des">Tell us a bit about your project (in one sentence)</Label>
            <Input
              value={card_des}
              onChange={event => this.setState({ card_des: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="about">Now tell us a bit more about your project</Label>
            <Input
              type="textarea"
              value={about}
              onChange={event => this.setState({ about: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="need">Most importantly, what type of people are you looking for?</Label>
            <Input
              type="textarea"
              value={need}
              onChange={event => this.setState({ need: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="links"> Link to your website or social media</Label>
            <Input
              value={links}
              onChange={event => this.setState({ links: event.target.value })}
              placeholder="http://www.yourwebsite.com"
            />
          </FormGroup>
          <Button color="danger"> Submit </Button>
        </Form>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProject);
