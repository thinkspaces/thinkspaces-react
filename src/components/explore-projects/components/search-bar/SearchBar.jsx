import React from 'react';
import { Button } from 'reactstrap';
import Tag from '../../../shared/tag';

const SearchBar = ({ location, type, discipline, skills, commitment, handleCancel }) => (
  <div>
    <div>
      {location.map((tag, index) => (
        <>
          {tag.checked && (
            <Tag
              text={tag.label}
              key={index}
              handleCancel={() => handleCancel('location', index)}
            />
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
      {skills.map((tag, index) => (
        <>
          {tag.checked && (
            <Tag text={tag.label} key={index} handleCancel={() => handleCancel('skills', index)} />
          )}
        </>
      ))}
      {commitment.map((tag, index) => (
        <>
          {tag.checked && (
            <Tag
              text={tag.label}
              key={index}
              handleCancel={() => handleCancel('commitment', index)}
            />
          )}
        </>
      ))}
    </div>
  </div>
);

export default SearchBar;
