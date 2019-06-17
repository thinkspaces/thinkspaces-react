import React from 'react';
import styled from 'styled-components';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import SaveButton from '../../../../../shared/save-button';

import useFirebaseStorage from '../../../../../../hooks/use-firebase-storage';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const ImagesForm = ({ className, pid }) => {
  const { files, loading, success, handleSave, handleUpdateFiles } = useFirebaseStorage(pid);
  return (
    <section className={className}>
      <h3>Upload images</h3>
      <FilePond
        onupdatefiles={fileItems => handleUpdateFiles(fileItems)}
        allowMultiple
        files={files}
      />
      <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
    </section>
  );
};

export default styled(ImagesForm)`
  @media (min-width: 30em) {
    .filepond--item {
      width: calc(50% - 0.5em);
    }
  }

  @media (min-width: 50em) {
    .filepond--item {
      width: calc(33.33% - 0.5em);
    }
  }
`;
