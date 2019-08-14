import { useState, useEffect } from 'react';

import { downloadProjectImages } from '../firebase/storage';

export default ({ field, form }) => {
  const [ files, setFiles ] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (field.value && field.value.length > 0) {
        if (field.value[0] instanceof File) {
          setFiles(field.value);
        } else {
          const imageFiles = await downloadProjectImages(field.value);
          form.setFieldValue('images', imageFiles);
          setFiles(imageFiles);
        }
      }
    };
    init();
  }, []);

  const handleUpdateFiles = (fileItems) => {
    const updatedImages = fileItems.map(fileItem => fileItem.file);
    form.setFieldValue('images', updatedImages);
    setFiles(updatedImages);
  };

  return { files, handleUpdateFiles };
};
