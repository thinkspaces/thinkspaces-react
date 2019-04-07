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

const skills = [
  { label: 'Analysis' },
  { label: 'Graphic Design' },
  { label: 'Film' },
  { label: 'Writing' },
  { label: 'Marketing' },
  { label: 'Programming' },
  { label: 'Engineering' },
  { label: 'Research' },
  { label: 'Management' },
  { label: 'Consulting' },
];

const commitment = [ { label: 'High' }, { label: 'Medium' }, { label: 'Low' } ];

class Filter extends Component {
  state = { location: [],
    type: [],
    discipline: [],
    skills: [],
    commitment: [],
    toggleLocation: false,
    toggleType: false,
    toggleDiscipline: false,
    toggleSkills: false,
    toggleCommitment: false };

  componentDidMount = () => {
    this.setState({ location: locations.map(item => ({ ...item, checked: false })),
      type: types.map(item => ({ ...item, checked: false })),
      discipline: disciplines.map(item => ({ ...item, checked: false })),
      skills: skills.map(item => ({ ...item, checked: false })),
      commitment: commitment.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    // eslint-disable-next-line react/destructuring-assignment
    const items = [ ...this.state[type] ];
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  toggle = type => this.setState(prevState => ({ [type]: !prevState[type] }));

  render() {
    const { location,
      type,
      discipline,
      skills,
      commitment,
      toggleType,
      toggleLocation,
      toggleDiscipline,
      toggleSkills,
      toggleCommitment } = this.state;
    return (
      <div>
        <SearchBar
          location={location}
          type={type}
          discipline={discipline}
          skills={skills}
          commitment={commitment}
          handleCancel={this.toggleItem}
        />
        <FilterOptions
          location={location}
          type={type}
          discipline={discipline}
          skills={skills}
          commitment={commitment}
          onSelect={this.toggleItem}
          toggleLocation={toggleLocation}
          toggleType={toggleType}
          toggleDiscipline={toggleDiscipline}
          toggleSkills={toggleSkills}
          toggleCommitment={toggleCommitment}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default Filter;
