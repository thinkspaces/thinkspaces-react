import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Row } from 'reactstrap';
import { db } from '../../../firebase';

import FilterDropdown from './components/filter-dropdown';
import SearchBar from './components/search-bar';

const Container = styled.div`
  margin-bottom: 10px;
  padding: 15px 20px;
`;

const Filter = ({ types, onFilter }) => {
  const [ categories, setCategories ] = useState([]);
  const [ toggles, setToggles ] = useState([]);

  useEffect(() => {
    const init = async () => {
      const _toggles = types.map(() => ({ open: false }));
      setToggles(_toggles);

      let _categories = await types.map(item =>
        db.getAllByFilter('tags')(db.where('type')('==')(item)));
      _categories = await Promise.all(
        _categories.map(async (category) => {
          let _category = await category;
          _category = _category.map(item => ({ ...item, checked: false }));
          return _category;
        }),
      );
      setCategories(_categories);
    };
    init();
  }, []);

  const toggle = i => () => {
    setToggles(prevState => [
      ...prevState.slice(0, i),
      { ...prevState[i], open: !prevState[i].open },
      ...prevState.slice(i + 1),
    ]);
  };

  const onSelectTag = (i, j) => {
    setCategories(prevState => [
      ...prevState.slice(0, i),
      [
        ...prevState[i].slice(0, j),
        { ...prevState[i][j], checked: !prevState[i][j].checked },
        ...prevState[i].slice(j + 1),
      ],
      ...prevState.slice(i + 1),
    ]);

    onFilter(categories[i][j]);
  };

  return (
    <Container>
      <SearchBar categories={categories} handleCancel={onSelectTag} />
      <Row>
        {categories.map((category, i) => (
          <FilterDropdown
            isOpen={toggles[i].open}
            toggle={toggle(i)}
            title={category[0].type}
            filterItems={category}
            onSelect={j => onSelectTag(i, j)}
          />
        ))}
      </Row>
    </Container>
  );
};

Filter.defaultProps = { types: [] };

export default Filter;
