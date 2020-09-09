// Libraries
import React from "react";
import styled from "styled-components";
import Select from "react-select";

// Hooks
import useTag from "hooks/use-tag";

const CategoryForm = ({ className, field, form }) => {
  const { allTags, chosenTags, handleChanges } = useTag(
    field.value,
    "project-category",
    form
  );

  return (
    <article className={className}>
      <h3>Category</h3>
      <span className="helpText">
        Choose tags that best describe the category or discipline your project
        falls under.
      </span>
      <Select
        captureMenuScroll={false}
        value={chosenTags}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        isMulti
        name="category"
        options={allTags}
        onChange={handleChanges}
        classNamePrefix="select"
      />
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
