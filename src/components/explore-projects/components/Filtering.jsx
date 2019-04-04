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

const FilterOptions = ({ addTag,
  location,
  type,
  discipine,
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
              <div>
                <Label>
                  <Input type="checkbox" onChange={() => addTag(location, 'location', 'Yale')} />
                Yale
                </Label>
              </div>
              <div>
                <Label>
                  <Input type="checkbox" onChange={() => addTag(location, 'location', 'Harvard')} />
                Harvard
                </Label>
              </div>
              <div>
                <Label>
                  <Input type="checkbox" onChange={() => addTag(location, 'location', 'Radford')} />
                Radford
                </Label>
              </div>
              <div>
                <Label>
                  <Input
                    type="checkbox"
                    onChange={() => addTag(location, 'location', 'University of New Haven')}
                  />
                University of New Haven
                </Label>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={toggleType} toggle={() => toggle('toggleType')}>
            <DropdownToggle caret tag="span">
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
        <Col>
          <Dropdown isOpen={toggleDiscipline} toggle={() => toggle('toggleDiscipline')}>
            <DropdownToggle caret tag="span">
            Discipline
            </DropdownToggle>
            <DropdownMenu>
              <div onClick={toggle}> Arts </div>
              <div onClick={toggle}> Engineering </div>
              <div onClick={toggle}> Food </div>
              <div onClick={toggle}> Film </div>
              <div onClick={toggle}> Health </div>
              <div onClick={toggle}> Humanities </div>
              <div onClick={toggle}> Tech </div>
              <div onClick={toggle}> Science </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
);

const SearchBar = ({ location }) => (
  <div>
    <Input placeholder="Filter projects" value={location} type="textarea" />
  </div>
);

class FilterProjects extends Component {
  state = { location: [],
    type: [],
    discipline: [],
    toggleLocation: false,
    toggleType: false,
    toggleDiscipline: false };

  // onValueChange = ({ target: { id, checked, type, value } }) => {
  //   if (type === 'checkbox') {
  //     value = !checked;
  //   }
  //   this.setState(prevState => ({ profile: { ...prevState.profile, [id]: value } }));
  // };

  // case swtich
  // figure out the events
  addTag = (array, type, tag) => {
    const newArray = array.slice();
    newArray.push(tag);
    console.log(newArray);
    if (type === 'location') {
      this.setState({ location: newArray });
    }
  };

  toggle = (type) => {
    if (type === 'toggleType') {
      this.setState({ toggleType: !this.state.toggleType });
    } else if (type === 'toggleLocation') {
      this.setState({ toggleLocation: !this.state.toggleLocation });
    } else {
      this.setState({ toggleDiscipline: !this.state.toggleDiscipline });
    }
  };

  render() {
    console.log('type location', this.state.toggleLocation);
    console.log('type type', this.state.toggleType);
    console.log('type discipline', this.state.toggleDiscipline);
    return (
      <div>
        <SearchBar location={this.state.location} />
        <FilterOptions
          addTag={this.addTag}
          location={this.state.location}
          type={this.state.type}
          discipline={this.state.discipine}
          toggleLocation={this.state.toggleLocation}
          toggleType={this.state.toggleType}
          toggleDiscipline={this.state.toggleDiscipline}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default FilterProjects;
