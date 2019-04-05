import React from 'react';
import Tag from '../../../shared/tag';

const SearchBar = ({ location, type, discipline, handleCancel }) => (
  <div>
    {location.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('location', index)} />
        )}
      </>
    ))}
    {type.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('type', index)} />
        )}
      </>
    ))}
    {discipline.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag
            text={tag.label}
            key={index}
            handleCancel={() => handleCancel('discipline', index)}
          />
        )}
      </>
    ))}
  </div>
);

export default SearchBar;
