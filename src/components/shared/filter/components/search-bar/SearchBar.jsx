import React from 'react';
import Tag from '../tag';

const SearchBar = ({ categories, handleCancel }) => (
  <div>
    {categories
      && categories.map((category, i) => (
        <>
          {category.map((tag, j) => (
            <>
              {tag.checked && (
                <Tag text={tag.name} key={j} handleCancel={() => handleCancel(i, j)} />
              )}
            </>
          ))}
        </>
      ))}
  </div>
);

export default SearchBar;
