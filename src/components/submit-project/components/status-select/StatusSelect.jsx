import React from 'react';
import Select from 'react-select';
import useTag from '../../../../hooks/use-tag';

const StatusSelect = ({ field, form }) => {
  const { allTags, chosenTags, handleChanges } = useTag(field.value, 'release-status', form);
  return (
    <Select
      className="select"
      captureMenuScroll={false}
      value={chosenTags}
      options={allTags}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.id}
      onChange={handleChanges}
    />
  );
};

export default StatusSelect;
