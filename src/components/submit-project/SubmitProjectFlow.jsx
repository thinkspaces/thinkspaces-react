import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import withAuthorization from '../utils/withAuthorization';
import { db } from '../../firebase';
import InputFilters from './components/input-filters';
import GeneralProjectInfo from './components/general-project-info';
import ProjectDetails from './components/project-details';
import ProjectRequest from './components/project-request';

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
  { label: 'Humanities' },
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
  { label: 'Consulting' },
];

class SubmitProjectFlow extends Component {
  state = { step: 1,
    title: '',
    contact: '',
    about: '',
    card_des: '',
    links: '',
    need: '',
    types: [],
    disciplines: [],
    locations: [],
    skills: [] };

  onSubmit = async (event) => {
    event.preventDefault();

    // prepare the fields
    const { title, contact, about, card_des, links, need } = this.state;
    const { history } = this.props;

    await db.createProjectWithFields({ title, about, card_des, contact, links, need });
    await // reset form
    this.setState({ title: '', contact: '', about: '', card_des: '', links: '', need: '' });

    history.push('/');
  };

  onNextStep = async () => {
    this.setState({ step: this.state.step++ });
  };

  render() {
    const { title,
      contact,
      about,
      card_des,
      links,
      need,
      category,
      types,
      disciplines,
      locations,
      skills } = this.state;
    return (
      <div>
        {() => {
          switch (this.state.step) {
            case 1:
              return (
                <GeneralProjectInfo
                  title={title}
                  links={links}
                  card_des={card_des}
                  contact={contact}
                  onNextStep={this.onNextStep}
                />
              );
            case 2:
              return (
                <ProjectDetails
                  about={about}
                  types={types}
                  disciplines={disciplines}
                  onNextStep={this.onNextStep}
                />
              );
            case 3:
              return <ProjectRequest skills={skills} need={need} onSubimt={this.onSubmit} />;
          }
        }}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProjectFlow);
