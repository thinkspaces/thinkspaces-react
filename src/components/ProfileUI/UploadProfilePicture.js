import React, { Component } from 'react';
import { storage } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import firebase from 'firebase/app';
import {db} from 'firebase';

//right now it just saves automatically. need to figure out how to change that
class ProfilePicture extends Component {
    state = {
        files: [],
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
         .storage()
         .ref('profilepictures')
         .child(filename)
         .getDownloadURL()
         .then(url => this.setState({ avatarURL: url }));
        this.props.profile.profilepicture = this.state.avatarURL;
        db.saveProfileChanges(this.props.profile);
    };
    // customOnChangeHandler = (event) => {
    //     const { target: { files } } = event;
    //     const filesToStore = [];
    //
    //     files.forEach(file => filesToStore.push(file));
    //
    //     this.setState({ files: filesToStore });
    // }
    // startUploadManually = () => {
    //   const { files } = this.state;
    //   files.forEach(file => {
    //     this.fileUploader.startUpload(file)
    //   });
    // }
    render() {
        return (
            <div>
            <FormGroup>
            {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
            }
            {this.state.avatarURL &&
                <img src={this.state.avatarURL} />
            }
            <FileUploader
                accept="image/*"
                name="avatar"
                filename = {file => this.props.profile.uid}
                storageRef={firebase.storage().ref('profilepictures')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
            />
            </FormGroup>
            </div>
        );
    }
}
export default ProfilePicture;
