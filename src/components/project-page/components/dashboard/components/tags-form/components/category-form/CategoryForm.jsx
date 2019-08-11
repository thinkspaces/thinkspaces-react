import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import Select from 'react-select';
import SaveButton from '../../../../../../../shared/save-button';
import useTag from '../../../../../../../../hooks/use-tag';

const CategoryForm = ({ className, pid }) => {
  const { tags, chosenTags, handleSave } = useTag(pid, 'project-category');
  const submitForm = (values, { setSubmitting, setStatus }) => {
    handleSave(values.chosenTags.map(tag => tag.id));
    setSubmitting(false);
    setStatus({ success: true });
  };

  return (
    <article className={className}>
      <Formik
        enableReinitialize
        initialValues={{ chosenTags }}
        onSubmit={submitForm}
        render={({ values, setFieldValue, handleSubmit, isSubmitting, status }) => (
          <form onSubmit={handleSubmit}>
            <h3>Category</h3>
            <span className="helpText">
              Choose tags that best describe the category or discipline your project falls under.
            </span>
            <Select
              captureMenuScroll={false}
              value={values.chosenTags}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id}
              isMulti
              name="category"
              options={tags}
              onChange={value => setFieldValue('chosenTags', value)}
              classNamePrefix="select"
            />
            <SaveButton
              type="submit"
              disabled={isSubmitting}
              success={status && status.success}
              loading={isSubmitting}
            />
          </form>
        )}
      />
    </article>
  );
};

export default styled(CategoryForm)`
  margin-bottom: 50px;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }

  .fieldCombo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .fieldCombo > * {
    margin-right: 5px;
  }

  .error {
    font-size: 0.8rem;
    color: red;
    display: block;
  }

  .bucketWrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
    grid-template-rows: repeat(auto-fit);
    grid-row-gap: 10px;
    grid-column-gap: 25px;
  }

  .checkboxCombo {
    display: flex;
    align-items: center;
  }

  .checkboxCombo > * {
    margin-right: 5px;
  }
`;
