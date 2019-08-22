import React from 'react';
import Select from 'react-select';
import useTag from '../../../../hooks/use-tag';

const DisciplineSelect = ({ field, form }) => {
  const { allTags, chosenTags, handleChanges } = useTag(field.value, 'project-category', form);
  return (
    <Select
      className="select"
      captureMenuScroll={false}
      value={chosenTags}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.id}
      isMulti
      options={allTags}
      onChange={handleChanges}
    />
  );
};

export default DisciplineSelect;
