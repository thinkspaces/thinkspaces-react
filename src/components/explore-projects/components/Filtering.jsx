import React, { Component } from 'react';
import { Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form } from 'reactstrap';

const FilterOptions = ({ locationDropdown, typeDropdown, toggle }) => (
  <div>
    <Row>
      <Col>
        <Dropdown isOpen={locationDropdown} toggle={toggle}>
          <DropdownToggle caret onClick={() => toggle(0)} tag="span">
            Location
          </DropdownToggle>
          <DropdownMenu>
            <div onClick={() => addTag(location, 'Yale')}> Yale </div>
            <div onClick={toggle}> Harvard </div>
            <div onClick={toggle}> Radford </div>
            <div onClick={toggle}> University of New Haven </div>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown isOpen={typeDropdown} toggle={toggle}>
          <DropdownToggle caret onClick={toggle} tag="span">
            Type
          </DropdownToggle>
          <DropdownMenu>
            <div onClick={toggle}> Startup </div>
            <div onClick={toggle}> Nonprofit </div>
            <div onClick={toggle}> Passion Project </div>
            <div onClick={toggle}> Club Project </div>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  </div>
);

class SearchBar extends Component {
  render() {
    return (
      <Form>
        <Input />
      </Form>
    );
  }
}

class FilterProjects extends Component {
  state = { location: [], type: [], toggleType: false, toggleDiscipline: false };

  // case swtich
  // figure out the events
  addTag = (array, tag) => {
    this.setState({});
  };

  toggle = (index) => {
    const { filterOptions } = this.state;
    const newFilter = [ ...filterOptions ];
    newFilter[index] = !newFilter[index];
    this.state({ filterOptions: newFilter });
  };

  render() {
    const { filterOptions } = this.state;
    return (
      <div>
        <SearchBar />
        <FilterOptions filterOptions={filterOptions} toggle={this.toggle} />
      </div>
    );
  }
}

export default FilterProjects;
