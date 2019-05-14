import React from 'react';
import Tag from '../../../shared/tag';

const SearchBar = ({ skills, disciplines, graduation, handleCancel }) => (
  <div>
    {skills.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('skills', index)} />
        )}
      </>
    ))}
    {disciplines.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag
            text={tag.label}
            key={index}
            handleCancel={() => handleCancel('disciplines', index)}
          />
        )}
      </>
    ))}
    {graduation.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag
            text={tag.label}
            key={index}
            handleCancel={() => handleCancel('graduation', index)}
          />
        )}
      </>
    ))}
  </div>
);

export default SearchBar;
