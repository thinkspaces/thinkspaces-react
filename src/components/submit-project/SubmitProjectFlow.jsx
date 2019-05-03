import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import withAuthorization from '../utils/withAuthorization';
import { db } from '../../firebase';
import GeneralProjectInfo from './components/general-project-info';
import ProjectDetails from './components/project-details';
import ProjectRequest from './components/project-request';
import './SubmitProjectFlow.css';

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

const _status = [
  { label: 'Ideation' },
  { label: 'Beta' },
  { label: 'Alpha' },
  { label: 'Launched' },
];

const _progress = [ { label: 'Fast' }, { label: 'Steady' }, { label: 'Slower than Desired' } ];

class SubmitProjectFlow extends Component {
  state = { step: 1,
    title: '',
    contact: '',
    about: '',
    card_des: '',
    links: '',
    role: '',
    need: '',
    location: '',
    communication: '',
    challenges: '',
    types: [],
    disciplines: [],
    status: [] };

  onSubmit = async (event) => {
    event.preventDefault();

    // prepare the fields
    const { title,
      contact,
      about,
      card_des,
      links,
      role,
      need,
      communication,
      challenges,
      location } = this.state;
    const { history } = this.props;

    await db.createProjectWithFields({ title,
      about,
      card_des,
      contact,
      links,
      need,
      communication,
      location,
      challenges });
    await // reset form
    this.setState({ title: '',
      contact: '',
      about: '',
      card_des: '',
      links: '',
      need: '',
      role: '',
      communication: '',
      challenges: '',
      communication: '' });

    history.push('/');
  };

  onNextStep = async () => {
    this.setState({ step: this.state.step++ });
  };

  componentDidMount = () => {
    this.setState({ types: _types.map(item => ({ ...item, checked: false })) });
    this.setState({ disciplines: _disciplines.map(item => ({ ...item, checked: false })) });
    this.setState({ status: _status.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    const items = [ ...this.state[type] ];
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  renderSwitch(step) {
    const { title,
      contact,
      about,
      card_des,
      links,
      need,
      role,
      communication,
      category,
      types,
      disciplines,
      locations,
      skills,
      commitments,
      location,
      challenges,
      status } = this.state;
    console.log(this.state.step);
    switch (step) {
      case 1:
        return (
          <div className="formStyle">
            <Row>
              <p style={{ paddingLeft: 17, paddingRight: 30 }}> Step 1/3 </p>

              <div className="progressbar">
                <div className="filler" style={{ width: '33%' }} />
              </div>
            </Row>
            <br />
            <GeneralProjectInfo
              title={title}
              links={links}
              card_des={card_des}
              contact={contact}
              location={locations}
              onChangeLocation={event => this.setState({ location: event.target.value })}
              onChangeTitle={event => this.setState({ title: event.target.value })}
              onChangeLinks={event => this.setState({ links: event.target.value })}
              onChangeCardDes={event => this.setState({ card_des: event.target.value })}
              onChangeContact={event => this.setState({ contact: event.target.value })}
            />
            <Button
              className="nextButton"
              color="primary"
              outline="true"
              onClick={event => this.setState({ step: 2 })}
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="formStyle">
            <Row>
              <p style={{ paddingLeft: 17, paddingRight: 30 }}> Step 2/3 </p>

              <div className="progressbar">
                <div className="filler" style={{ width: '66%' }} />
              </div>
            </Row>
            <br />
            <ProjectDetails
              about={about}
              onChangeAbout={event => this.setState({ about: event.target.value })}
              challenges={challenges}
              onChangeChallenges={event => this.setState({ challenges: event.target.value })}
              status={status}
              types={types}
              toggleItem={this.toggleItem}
            />
            <Button
              style={{ marginTop: 20 }}
              color="primary"
              outline="true"
              onClick={event => this.setState({ step: 1 })}
            >
              Back
            </Button>
            <Button
              className="nextButton"
              color="primary"
              outline="true"
              onClick={event => this.setState({ step: 3 })}
            >
              Next
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="formStyle">
            <Row>
              <p style={{ paddingLeft: 17, paddingRight: 30 }}> Step 3/3 </p>
              <br />
              <div className="progressbar">
                <div className="filler" style={{ width: '100%' }} />
              </div>
            </Row>
            <br />
            <ProjectRequest
              role={role}
              onChangeRole={event => this.setState({ role: event.target.value })}
              need={need}
              onChangeNeed={event => this.setState({ need: event.target.value })}
              communication={communication}
              onChangeCommunication={event => this.setState({ communication: event.target.value })}
              commitment={commitments}
              toggleItem={this.toggleItem}
            />
            <Button
              style={{ marginTop: 20 }}
              color="primary"
              outline="true"
              onClick={event => this.setState({ step: 2 })}
            >
              Back
            </Button>
            <Button className="nextButton" color="primary" outline="true" onClick={this.onSubmit}>
              {' '}
              Submit{' '}
            </Button>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <h2 className="titleStyle"> Create a Project </h2>
        <br />
        {this.renderSwitch(this.state.step)}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProjectFlow);
