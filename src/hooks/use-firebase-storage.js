import { useState } from 'react';
import useLoader from './use-loader';

import {
  downloadProjectImages,
  uploadProjectImages,
  deleteProjectImages,
} from '../firebase/storage';
import { db } from '../firebase';

export default (pid) => {
  const [ files, setFiles ] = useState([]);

  const setup = async () => {
    if (!pid) {
      return;
    }
    const { imageFiles } = await downloadProjectImages(pid);
    setFiles(imageFiles);
  };

  const saveHandler = async () => {
    await deleteProjectImages(pid);
    const imageURLs = await uploadProjectImages(pid, files);
    await db.update('projects')(pid)({ images: imageURLs });
  };

  const handleUpdateFiles = (fileItems) => {
    if (!fileItems) {
      return;
    }
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { files, loading, success, handleSave, handleUpdateFiles };
};
