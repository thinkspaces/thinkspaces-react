// Libraries
import React from "react";
import styled from "styled-components";
import { Field } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Hooks
import useFirebaseStorage from "hooks/use-firebase-storage";

// Styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

const FilePondField = ({ field, form }) => {
  const { files, handleUpdateFiles } = useFirebaseStorage({ field, form });
  return (
    <FilePond onupdatefiles={handleUpdateFiles} allowMultiple files={files} />
  );
};

const Container = styled.div`
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

const ImagesForm = () => (
  <Container>
    <h3>Upload images</h3>
    <Field name="images" component={FilePondField} />
  </Container>
);

export default ImagesForm;
