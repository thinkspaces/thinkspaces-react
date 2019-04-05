/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import FilterOptions from '../filter-options';
import SearchBar from '../search-bar';

const locations = [
  { label: 'Yale' },
  { label: 'Harvard' },
  { label: 'Radford' },
  { label: 'University of New Haven' },
];

const types = [
  { label: 'Startup' },
  { label: 'Nonprofit' },
  { label: 'Passion Project' },
  { label: 'Club Project' },
];

const disciplines = [
  { label: 'Arts' },
  { label: 'Engineering' },
  { label: 'Food' },
  { label: 'Film' },
  { label: 'Health' },
  { label: 'Humanities' },
  { label: 'Tech' },
  { label: 'Science' },
];

class Filter extends Component {
  state = { location: [],
    type: [],
    discipline: [],
    toggleLocation: false,
    toggleType: false,
    toggleDiscipline: false };

  componentDidMount = () => {
    this.setState({ location: locations.map(item => ({ ...item, checked: false })),
      type: types.map(item => ({ ...item, checked: false })),
      discipline: disciplines.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    // eslint-disable-next-line react/destructuring-assignment
    const items = [ ...this.state[type] ];
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  toggle = type => this.setState(prevState => ({ [type]: !prevState[type] }));

  render() {
    const { location, type, discipline, toggleType, toggleLocation, toggleDiscipline } = this.state;
    return (
      <div>
        <SearchBar
          location={location}
          type={type}
          discipline={discipline}
          handleCancel={this.toggleItem}
        />
        <FilterOptions
          location={location}
          type={type}
          discipline={discipline}
          onSelect={this.toggleItem}
          toggleLocation={toggleLocation}
          toggleType={toggleType}
          toggleDiscipline={toggleDiscipline}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default Filter;
