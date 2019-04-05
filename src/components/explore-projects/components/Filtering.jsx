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
import Tag from '../../shared/tag';

const DropdownElement = ({ state_array, state_type, label, addTag }) => (
  <div>
    <Label>
      <Input type="checkbox" onChange={() => addTag(state_array, state_type, label)} />
      {label}
    </Label>
  </div>
);

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
              <DropdownElement
                state_array={location}
                state_type="location"
                label="Yale"
                addTag={addTag}
              />
              <DropdownElement
                state_array={location}
                state_type="location"
                label="Harvard"
                addTag={addTag}
              />
              <DropdownElement
                state_array={location}
                state_type="location"
                label="Radford"
                addTag={addTag}
              />
              <DropdownElement
                state_array={location}
                state_type="location"
                label="University of New Haven"
                addTag={addTag}
              />
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={toggleType} toggle={() => toggle('toggleType')}>
            <DropdownToggle caret tag="span">
            Type
            </DropdownToggle>
            <DropdownMenu>
              <DropdownElement state_array={type} state_type="type" label="Startup" addTag={addTag} />
              <DropdownElement
                state_array={type}
                state_type="type"
                label="Nonprofit"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="type"
                label="Passion Project"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="type"
                label="Club Project"
                addTag={addTag}
              />
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={toggleDiscipline} toggle={() => toggle('toggleDiscipline')}>
            <DropdownToggle caret tag="span">
            Discipline
            </DropdownToggle>
            <DropdownMenu>
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Arts"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Engineering"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Food"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Film"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Health"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Humanities"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Tech"
                addTag={addTag}
              />
              <DropdownElement
                state_array={type}
                state_type="discipline"
                label="Science"
                addTag={addTag}
              />
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
);

const SearchBar = ({ location, type, discipline, handleCancel }) => (
  <div>
    {location.map((tag, index) => (
      <Tag text={tag} type="location" key={index} array={location} handleCancel={handleCancel} />
    ))}
    {type.map((tag, index) => (
      <Tag text={tag} type="type" key={index} array={type} handleCancel={handleCancel} />
    ))}
    {discipline.map((tag, index) => (
      <Tag
        text={tag}
        type="discipline"
        key={index}
        array={discipline}
        handleCancel={handleCancel}
      />
    ))}
  </div>
);

class Filtering extends Component {
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

  handleCancel = (text, index, array, type) => {
    console.log(index);
    if (type == 'location') {
      array.splice(index, 1);
      console.log(array);
      console.log(index);
      this.setState({ location: array });
    } else if (type == 'type') {
      array.splice(index, 1);
      console.log(array);
      this.setState({ type: array });
    }
  };

  addTag = (array, type, tag) => {
    console.log(array);
    console.log(type);
    const newArray = array.slice();
    newArray.push(tag);
    console.log(newArray);
    if (type == 'location') {
      this.setState({ location: newArray });
    } else if (type == 'type') {
      this.setState({ type: newArray });
    } else if (type == 'discipline') {
      this.setState({ type: newArray });
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
    return (
      <div>
        <SearchBar
          location={this.state.location}
          type={this.state.type}
          discipline={this.state.discipline}
          handleCancel={this.handleCancel}
        />
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

export default Filtering;
