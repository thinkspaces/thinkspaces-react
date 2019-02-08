import React, { Component } from 'react';
import { storage } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import firebase from 'firebase/app';
import {db} from "../../firebase";

//right now it just saves automatically. need to figure out how to change that
//need a way to change profile picture
class ProjectPictures extends Component {
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
         .ref('projectpictures')
         .child(filename)
         .getDownloadURL()
         .then(url => {
             console.log(url);
             db.saveProjectPicture(url);
             this.setState({ avatarURL: url });
        });
    };

    render() {
        return (
            <div>
            <FormGroup>
            {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
            }
            {this.state.avatarURL &&
                <img src={this.state.avatarURL} width = "50%" height = "50%"/>
            }
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
            </div>
        );
    }
}
export default ProjectPictures;
