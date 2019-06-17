import React from 'react';
import { Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Col,
  Label,
  Input } from 'reactstrap';

const DropdownElement = ({ checked, index, label, onSelect }) => (
  <DropdownItem onClick={() => onSelect(index)}>
    <Label check>
      <Input type="checkbox" checked={checked} />
      {label}
    </Label>
  </DropdownItem>
);

const MenuModifiers = { setMaxHeight: { enabled: true,
  order: 890,
  fn: data => ({ ...data, styles: { ...data.styles, overflow: 'auto', maxHeight: 200 } }) } };

const FilterDropdown = ({ isOpen, toggle, title, filterItems, onSelect }) => (
  <Col>
    <Dropdown style={{ marginTop: 5 }} isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret tag="span" style={{ cursor: 'pointer' }}>
        {title}
      </DropdownToggle>
      <DropdownMenu modifiers={MenuModifiers}>
        {filterItems.map((item, i) => (
          <DropdownElement
            index={i}
            label={item.name}
            onSelect={() => onSelect(i)}
            checked={item.checked}
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  </Col>
);

export default FilterDropdown;
