import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import withAuthorization from '../utils/withAuthorization';
import { db } from '../../firebase';
import GeneralProjectInfo from './components/general-project-info';
import ProjectDetails from './components/project-details';
import ProjectRequest from './components/project-request';
import './SubmitProjectFlow.css';

const _types = [ 'Startup', 'Nonprofit', 'Passion Project', 'Club Project' ];

const _disciplines = [ 'Arts', 'Community', 'Health', 'Politics', 'Tech', 'Science' ];

const _status = [ 'Ideation', 'Beta', 'Alpha', 'Launched' ];

// toggleItem = (type, index) => {
//   console.log(type);
//   switch (type) {
//     case 'types': {
//       console.log('clicked');
//       if (!this.state.types.includes(_types[index])) {
//         this.state.types.push(_types[index]);
//         this.setState({ types: this.state.types });
//       } else {
//         this.state.types.pop(_types[index]);
//         this.setState({ types: this.state.types });
//       }
//     }
//     case 'status': {
//       console.log('clicked status');
//       if (!this.state.status.includes(_status[index])) {
//         this.state.status.push(_status[index]);
//         this.setState({ status: this.state.status });
//       } else {
//         this.state.status.pop(_status[index]);
//         this.setState({ status: this.state.status });
//       }
//     }
//     case 'disciplines': {
//       console.log('clicked disciplines');
//       if (!this.state.disciplines.includes(_disciplines[index])) {
//         this.state.disciplines.push(_disciplines[index]);
//         this.setState({ disciplines: this.state.disciplines });
//       } else {
//         this.state.disciplines.pop(_disciplines[index]);
//         this.setState({ disciplines: this.state.disciplines });
//       }
//     }
//   }
// };

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
      location,
      types,
      status,
      disciplines } = this.state;
    const { history } = this.props;

    await db.createProjectWithFields({ title,
      about,
      card_des,
      contact,
      links,
      need,
      role,
      communication,
      location,
      challenges,
      types,
      status,
      disciplines });
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
      types: [],
      status: [],
      disciplines: [] });

    history.push('/');
  };

  onNextStep = async () => {
    this.setState({ step: this.state.step++ });
  };

  // componentDidMount = () => {
  //   this.setState({ types_: _types.map(item => ({ ...item, checked: false })) });
  //   this.setState({ status_: _status.map(item => ({ ...item, checked: false })) });
  // };

  toggleTypes = (index) => {
    if (!this.state.types.includes(_types[index])) {
      this.state.types.push(_types[index]);
      this.setState({ types: this.state.types });
    } else {
      this.state.types.pop(_types[index]);
      this.setState({ types: this.state.types });
    }
  };

  toggleStatus = (index) => {
    if (!this.state.status.includes(_status[index])) {
      this.state.status.push(_status[index]);
      this.setState({ status: this.state.status });
    } else {
      this.state.status.pop(_status[index]);
      this.setState({ status: this.state.status });
    }
  };

  toggleDiscipline = (index) => {
    if (!this.state.disciplines.includes(_disciplines[index])) {
      this.state.disciplines.push(_disciplines[index]);
      this.setState({ disciplines: this.state.disciplines });
    } else {
      this.state.disciplines.pop(_disciplines[index]);
      this.setState({ disciplines: this.state.disciplines });
    }
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
    console.log('disciplines', this.state.disciplines);
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
              disciplines={disciplines}
              toggleDiscipline={this.toggleDiscipline}
              toggleTypes={this.toggleTypes}
              toggleStatus={this.toggleStatus}
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
            <Button className="nextButton" color="danger" outline="true" onClick={this.onSubmit}>
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
