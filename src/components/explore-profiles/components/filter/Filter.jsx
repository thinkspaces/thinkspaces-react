/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import FilterOptions from '../filter-options';
import SearchBar from '../search-bar';

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
  { label: 'Consulting' },
];

const _disciplines = [
  { label: 'Arts' },
  { label: 'Engineering' },
  { label: 'Food' },
  { label: 'Film' },
  { label: 'Health' },
  { label: 'Humanities' },
  { label: 'Tech' },
  { label: 'Science' },
];

const _graduation = [
  { label: 'First Year' },
  { label: 'Sophomore' },
  { label: 'Junior' },
  { label: 'Senior' },
  { label: 'Graduate School' },
];

class Filter extends Component {
  state = { skills: [],
    disciplines: [],
    graduation: [],
    toggleSkills: false,
    toggleDiscipline: false,
    toggleGraduation: false };

  componentDidMount = () => {
    this.setState({ skills: _skills.map(item => ({ ...item, checked: false })),
      disciplines: _disciplines.map(item => ({ ...item, checked: false })),
      graduation: _graduation.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    // eslint-disable-next-line react/destructuring-assignment
    const items = [ ...this.state[type] ];
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  toggle = type => this.setState(prevState => ({ [type]: !prevState[type] }));

  render() {
    const { skills,
      disciplines,
      graduation,
      toggleSkills,
      toggleDiscipline,
      toggleGraduation } = this.state;
    return (
      <div>
        <SearchBar
          skills={skills}
          disciplines={disciplines}
          graduation={graduation}
          handleCancel={this.toggleItem}
        />
        <FilterOptions
          skills={skills}
          disciplines={disciplines}
          graduation={graduation}
          onSelect={this.toggleItem}
          toggleSkills={toggleSkills}
          toggleDiscipline={toggleDiscipline}
          toggleGraduation={toggleGraduation}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default Filter;
