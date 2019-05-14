import React from 'react';
import { Row, Button } from 'reactstrap';
import FilterDropdown from '../../../shared/filter-dropdown';

const FilterButton = () => (
  <Button style={{ marginLeft: 30, marginRight: 40 }} outline color="info">
    Filter
  </Button>
);

const FilterOptions = ({ locations,
  types,
  disciplines,
  skills,
  commitments,
  onSelect,
  toggleLocation,
  toggleType,
  toggleDiscipline,
  toggleSkills,
  toggleCommitment,
  toggle }) => (
    <div>
      <hr style={{ margin: 5 }} />
      <Row>
        <FilterButton />

        <FilterDropdown
          title="Location"
          type="locations"
          isOpen={toggleLocation}
          toggle={() => toggle('toggleLocation')}
          onSelect={onSelect}
          filterItems={locations}
        />
        <FilterDropdown
          title="Type"
          type="types"
          isOpen={toggleType}
          toggle={() => toggle('toggleType')}
          onSelect={onSelect}
          filterItems={types}
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
          title="Skills"
          type="skills"
          isOpen={toggleSkills}
          toggle={() => toggle('toggleSkills')}
          onSelect={onSelect}
          filterItems={skills}
        />
        <FilterDropdown
          title="Commitment"
          type="commitments"
          isOpen={toggleCommitment}
          toggle={() => toggle('toggleCommitment')}
          onSelect={onSelect}
          filterItems={commitments}
        />
      </Row>
      <hr style={{ margin: 5 }} />
    </div>
);

export default FilterOptions;
