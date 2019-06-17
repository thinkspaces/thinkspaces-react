import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import SaveButton from '../../../../../../../shared/save-button';
import useTags from '../../../../../../../../hooks/use-tags';

const CategoryForm = ({ className, pid }) => {
  const { handleSave, handleChange, success, loading, tags, chosenTags } = useTags(
    pid,
    'project-category',
  );
  return (
    <article className={className}>
      <h3>Category</h3>
      <span className="helpText">
        Choose tags that best describe the category or discipline your project falls under.
      </span>
      <Select
        captureMenuScroll={false}
        value={chosenTags}
        isMulti
        name="category"
        options={tags}
        onChange={handleChange}
        classNamePrefix="select"
      />
      <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
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
