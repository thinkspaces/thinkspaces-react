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

// const ProgressBar = props => (
//   <div className="progress-bar">
//     <Filler step={this.props.step} />
//   </div>
// );
//
// const Filler = (props) => {
//   switch (this.props.step) {
//     case 1:
//       return <div className="filler" style={{ width: '${33}%' }} />;
//     case 2:
//       return <div className="filler" style={{ width: '${66}%' }} />;
//     case 3:
//       return <div className="filler" style={{ width: '${100}%' }} />;
//   }
// };

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
    skills: [],
    commitments: [] };

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

  componentDidMount = () => {
    this.setState({ types: _types.map(item => ({ ...item, checked: false })) });
    this.setState({ commitments: _commitments.map(item => ({ ...item, checked: false })) });
    this.setState({ skills: _skills.map(item => ({ ...item, checked: false })) });
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
      category,
      types,
      disciplines,
      locations,
      skills,
      commitments } = this.state;
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
              types={types}
              toggleItem={this.toggleItem}
            />
            <div onClick={event => this.setState({ step: 1 })}>Back</div>
            <Button
              className="nextButton"
              color="primary"
              outline="true"
              onClick={event => this.setState({ step: 3 })}
            >
              {' '}
              Next{' '}
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

            <ProjectRequest
              need={need}
              onChangeNeed={event => this.setState({ need: event.target.value })}
              skills={skills}
              commitment={commitments}
              toggleItem={this.toggleItem}
            />
            <div onClick={event => this.setState({ step: 2 })}>Back</div>
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
