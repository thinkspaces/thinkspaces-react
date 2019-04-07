import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, Row, Col, Label, Input, Button } from 'reactstrap';
import './FilterOptions';

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
  skills,
  commitment,
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
        <Button style={{ marginRight: 30, marginLeft: 20 }} outline="primary">
          {' '}
        Filter{' '}
        </Button>
        <Col>
          <Dropdown
            style={{ marginTop: 5 }}
            isOpen={toggleLocation}
            toggle={() => toggle('toggleLocation')}
          >
            <DropdownToggle caret tag="span">
            Location
            </DropdownToggle>
            <DropdownMenu style={{ paddingLeft: 30, paddingRight: 20, paddingTop: 10 }}>
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
          <Dropdown style={{ marginTop: 5 }} isOpen={toggleType} toggle={() => toggle('toggleType')}>
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
          <Dropdown
            style={{ marginTop: 5 }}
            isOpen={toggleDiscipline}
            toggle={() => toggle('toggleDiscipline')}
          >
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
        <Col>
          <Dropdown
            style={{ marginTop: 5 }}
            isOpen={toggleSkills}
            toggle={() => toggle('toggleSkills')}
          >
            <DropdownToggle caret tag="span">
            Skills
            </DropdownToggle>
            <DropdownMenu>
              {skills.map((item, i) => (
                <DropdownElement
                  type="skills"
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
          <Dropdown
            style={{ marginTop: 5 }}
            isOpen={toggleCommitment}
            toggle={() => toggle('toggleCommitment')}
          >
            <DropdownToggle caret tag="span">
            Commitment
            </DropdownToggle>
            <DropdownMenu>
              {commitment.map((item, i) => (
                <DropdownElement
                  type="commitment"
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
      <hr />
    </div>
);

export default FilterOptions;
