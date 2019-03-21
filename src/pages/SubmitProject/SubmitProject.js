/* eslint camelcase: 0 */
import React, { Component } from 'react';

import FileUploader from 'react-firebase-file-uploader';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

import firebase from 'firebase/app';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import EditProjectImages from './EditProjectImages/EditProjectImages'

import withAuthorization from '../../components/Authentication/withAuthorization';
import { storage, db } from '../../firebase';
import { db as rawDb } from '../../firebase/firebase';

class SubmitProject extends Component {
  state = { title: '',
    contact: '',
    about: '',
    card_des: '',
    images: '',
    imageFiles: [],
    links: '',
    need: '',
    files: [],
    avatar: '',
    isUploading: false,
    progress: 0,
    tags: [],
    category: false };

    handleUploadImages = (imageFiles) => {
      this.setState({ imageFiles: [ ...imageFiles ] })
    }

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

  createProject = async (event) => {
    event.preventDefault();

    // prepare the fields
    const { title, contact, about, card_des, images, imageFiles, links, need, tags } = this.state;
    const { history } = this.props;

    const pid = await db.createProjectWithFields({ title,
      about,
      card_des,
      contact,
      images,
      links,
      need })

    // upload necessary images
    const imageURLs = await storage.uploadProjectImages(pid, imageFiles)

    // update the project with the image URLs
    await rawDb.collection('projects').doc(pid).set({ images: imageURLs }, { merge: true })

    // reset form
    this.setState({ title: '',
      contact: '',
      about: '',
      card_des: '',
      images: '',
      imageFiles: [],
      links: '',
      need: '',
      category: [] });

    history.push('/');
  };

  onValueChange = ({ target: { id, checked, type } }) => {
    console.log(id);
    if (checked) {
      db.addTags({ id });
    }
    this.setState({ tags: [ id ] });
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
      images,
      category } = this.state;
    return (
      <BaseContainer>
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

          <EditProjectImages handleUploadImages={this.handleUploadImages} />

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
          Choose your project category
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="art" onChange={this.onValueChange} />
              Arts
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="health" onChange={this.onValueChange} />
              Health {'&'} Wellness
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="tech" onChange={this.onValueChange} />
              Tech
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="card_des">What is your project (in one sentence)</Label>
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
      </BaseContainer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProject);
