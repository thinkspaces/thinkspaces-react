import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, Row, Col, Label, Input } from 'reactstrap';

const DropdownElement = ({ checked, index, type, label, onSelect }) => (
  <div>
    <Label>
      <Input type="checkbox" checked={checked} onChange={() => onSelect(type, index)} />
      {label}
    </Label>
  </div>
);

const FilterOptions = ({ location,
  type,
  discipline,
  onSelect,
  toggleLocation,
  toggleType,
  toggleDiscipline,
  toggle }) => (
    <div>
      <Row>
        <Col>
          <Dropdown isOpen={toggleLocation} toggle={() => toggle('toggleLocation')}>
            <DropdownToggle caret tag="span">
            Location
            </DropdownToggle>
            <DropdownMenu>
              {location.map((item, i) => (
                <DropdownElement
                  type="location"
                  index={i}
                  label={item.label}
                  onSelect={onSelect}
                  checked={item.checked}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={toggleType} toggle={() => toggle('toggleType')}>
            <DropdownToggle caret tag="span">
            Type
            </DropdownToggle>
            <DropdownMenu>
              {type.map((item, i) => (
                <DropdownElement
                  type="type"
                  index={i}
                  label={item.label}
                  onSelect={onSelect}
                  checked={item.checked}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={toggleDiscipline} toggle={() => toggle('toggleDiscipline')}>
            <DropdownToggle caret tag="span">
            Discipline
            </DropdownToggle>
            <DropdownMenu>
              {discipline.map((item, i) => (
                <DropdownElement
                  type="discipline"
                  index={i}
                  label={item.label}
                  onSelect={onSelect}
                  checked={item.checked}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
);

export default FilterOptions;
