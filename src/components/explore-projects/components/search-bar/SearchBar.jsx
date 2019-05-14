import React from 'react';
import Tag from '../../../shared/tag';

const SearchBar = ({ locations, types, disciplines, skills, commitments, handleCancel }) => (
  <div>
    {locations.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('locations', index)} />
        )}
      </>
    ))}
    {types.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('types', index)} />
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
    {skills.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag text={tag.label} key={index} handleCancel={() => handleCancel('skills', index)} />
        )}
      </>
    ))}
    {commitments.map((tag, index) => (
      <>
        {tag.checked && (
          <Tag
            text={tag.label}
            key={index}
            handleCancel={() => handleCancel('commitments', index)}
          />
        )}
      </>
    ))}
  </div>
);

export default SearchBar;
