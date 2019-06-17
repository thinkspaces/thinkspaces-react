import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import SaveButton from '../../../../../../../shared/save-button';
import useTags from '../../../../../../../../hooks/use-tags';

const OrganizationForm = ({ className, pid }) => {
  const { handleSave, handleChange, success, loading, tags, chosenTags } = useTags(
    pid,
    'organization',
  );

  return (
    <article className={className}>
      <h3>Organization type</h3>
      <span className="helpText">
        Choose a tag that best describes the organizational structure of your project.
      </span>
      <Select
        captureMenuScroll={false}
        value={chosenTags}
        name="organization"
        options={tags}
        onChange={tag => handleChange([ tag ])}
        classNamePrefix="select"
      />
      <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
    </article>
  );
};

export default styled(OrganizationForm)`
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
