import React from 'react';
import { Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Col,
  Label,
  Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const DropdownElement = ({ checked, index, type, label, onSelect }) => (
  <DropdownItem onClick={() => onSelect(type, index)}>
    <Label check>
      <Input type="checkbox" checked={checked} />
      {label}
    </Label>
  </DropdownItem>
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

export default withRouter(FilterDropdown);
