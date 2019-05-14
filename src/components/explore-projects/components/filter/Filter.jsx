/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import FilterOptions from '../filter-options';
import SearchBar from '../search-bar';

const _locations = [
  { label: 'Yale' },
  { label: 'Harvard' },
  { label: 'Radford' },
  { label: 'University of New Haven' },
];

const _types = [
  { label: 'Startup' },
  { label: 'Nonprofit' },
  { label: 'Passion Project' },
  { label: 'Club Project' },
];

const _disciplines = [
  { label: 'Arts' },
  { label: 'Engineering' },
  { label: 'Food' },
  { label: 'Film' },
  { label: 'Health' },
  { label: 'Human Rights' },
  { label: 'Tech' },
  { label: 'Science' },
];

const _skills = [
  { label: 'Analysis' },
  { label: 'Graphic Design' },
  { label: 'Film' },
  { label: 'Writing' },
  { label: 'Marketing' },
  { label: 'Programming' },
  { label: 'Engineering' },
  { label: 'Research' },
  { label: 'Management' },
];

const _commitments = [ { label: 'High' }, { label: 'Medium' }, { label: 'Low' } ];

class Filter extends Component {
  state = { locations: [],
    types: [],
    disciplines: [],
    skills: [],
    commitments: [],
    toggleLocation: false,
    toggleType: false,
    toggleDiscipline: false,
    toggleSkills: false,
    toggleCommitment: false };

  componentDidMount = () => {
    this.setState({ locations: _locations.map(item => ({ ...item, checked: false })),
      types: _types.map(item => ({ ...item, checked: false })),
      disciplines: _disciplines.map(item => ({ ...item, checked: false })),
      skills: _skills.map(item => ({ ...item, checked: false })),
      commitments: _commitments.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    // eslint-disable-next-line react/destructuring-assignment
    const items = [ ...this.state[type] ];
    console.log(items);
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  toggle = type => this.setState(prevState => ({ [type]: !prevState[type] }));

  render() {
    const { locations,
      types,
      disciplines,
      skills,
      commitments,
      toggleType,
      toggleLocation,
      toggleDiscipline,
      toggleSkills,
      toggleCommitment } = this.state;
    return (
      <div>
        <SearchBar
          locations={locations}
          types={types}
          disciplines={disciplines}
          skills={skills}
          commitments={commitments}
          handleCancel={this.toggleItem}
        />
        <FilterOptions
          locations={locations}
          types={types}
          disciplines={disciplines}
          skills={skills}
          commitments={commitments}
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
