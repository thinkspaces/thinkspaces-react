import React from 'react';
import { Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Row,
  Col,
  Label,
  Input,
  Button } from 'reactstrap';
import './FilterOptions.css';

const DropdownElement = ({ checked, index, type, label, onSelect }) => (
  <DropdownItem onClick={() => onSelect(type, index)}>
    <Label check>
      <Input type="checkbox" checked={checked} />
      {label}
    </Label>
  </DropdownItem>
);

const FilterButton = () => (
  <Button style={{ marginRight: 30, marginLeft: 20 }} outline="primary">
    Filter
  </Button>
);

const FilterDropdown = ({ isOpen, toggle, title, type, filterItems, onSelect }) => (
  <Col>
    <Dropdown style={{ marginTop: 5 }} isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret tag="span">
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {filterItems.map((item, i) => (
          <DropdownElement
            type={type}
            index={i}
            label={item.label}
            onSelect={onSelect}
            checked={item.checked}
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  </Col>
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
      <hr />
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
      <hr />
    </div>
);

export default FilterOptions;
