// Libraries
import React from "react";

// Components
import Tag from "components/shared/filter/components/search-bar/tag";

const SearchBar = ({ categories, handleCancel }) => (
  <div>
    {categories &&
      categories.map((category, i) => (
        <>
          {category.map((tag, j) => (
            <>
              {tag.checked && (
                <Tag
                  text={tag.name}
                  key={j}
                  handleCancel={() => handleCancel(i, j)}
                />
              )}
            </>
          ))}
        </>
      ))}
  </div>
);

export default SearchBar;
