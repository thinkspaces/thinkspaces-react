import React from 'react';
import { Row, Button } from 'reactstrap';
import FilterDropdown from '../../../shared/filter-dropdown';

const FilterButton = () => (
  <Button style={{ marginLeft: 30, marginRight: 40 }} outline color="info">
    Filter
  </Button>
);

const FilterOptions = ({ skills,
  disciplines,
  graduation,
  onSelect,
  toggleSkills,
  toggleDiscipline,
  toggleGraduation,
  toggle }) => (
    <div>
      <hr style={{ margin: 5 }} />
      <Row>
        <FilterButton />

        <FilterDropdown
          title="Skills"
          type="skills"
          isOpen={toggleSkills}
          toggle={() => toggle('toggleSkills')}
          onSelect={onSelect}
          filterItems={skills}
        />
        <FilterDropdown
          title="Discipline"
          type="disciplines"
          isOpen={toggleDiscipline}
          toggle={() => toggle('toggleDiscipline')}
          onSelect={onSelect}
          filterItems={disciplines}
        />
        <FilterDropdown
          title="Graduation"
          type="graduation"
          isOpen={toggleGraduation}
          toggle={() => toggle('toggleGraduation')}
          onSelect={onSelect}
          filterItems={graduation}
        />
      </Row>
      <hr style={{ margin: 5 }} />
    </div>
);

export default FilterOptions;
