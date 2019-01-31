import React, { Component } from 'react';
import { storage } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class ProfilePicture extends Component {
    state = {
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };
    render() {
        return (
            <div>
            <form>
            <label>Avatar:</label>
            {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
            }
            {this.state.avatarURL &&
            <img src={this.state.avatarURL} />
            }
            <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            />
            </form>
            </div>
        );
    }
}
export default ProfilePicture;
