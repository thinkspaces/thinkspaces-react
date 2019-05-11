import React, { useState, useEffect } from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './ProjectImagesForm.css'
import styles from './ProjectImagesForm.module.css'

import { downloadProjectImages, uploadProjectImages, deleteProjectImages } from '../../../../../firebase/storage';
import { setProjectImages } from '../../../../../firebase/db';

registerPlugin(FilePondPluginImagePreview);

const ProjectImagesForm = (props) => {
  const { pid } = props
  const [ files, setFiles ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await deleteProjectImages(pid);
    const imageURLs = await uploadProjectImages(pid, files);
    await setProjectImages(pid, imageURLs);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }

  const handleSetup = async () => {
    setLoading(true);
    if (!pid) { return }
    const { imageFiles } = await downloadProjectImages(pid);
    setFiles(imageFiles);
    setLoading(false);
  }

  const handleUpdateFiles = (fileItems) => {
    if (!fileItems) { return }
    setFiles(fileItems.map(fileItem => fileItem.file))
  }

  useEffect(() => {
    handleSetup()
  }, []);

  return (
    <>
      <h3>Upload images</h3>
      <FilePond
        onupdatefiles={fileItems => handleUpdateFiles(fileItems)}
        allowMultiple
        files={files}
      />
      <div className={styles.save}>
        <button type="button" className="defBtn" onClick={handleSave}>
            Save
        </button>
        {
            loading ? (
              <div className="fade-in-animation">
                <FontAwesomeIcon icon="circle-notch" spin />
              </div>
            ) : null
        }
        {
            success ? (
              <div className="fade-in-animation">
                <FontAwesomeIcon icon="check-circle" />
              </div>
            ) : null
        }
      </div>
    </>
  );
}

export default ProjectImagesForm
