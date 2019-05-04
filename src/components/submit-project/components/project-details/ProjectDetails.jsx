/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Row, Col, Label, Input, Form } from 'reactstrap';
import '../../SubmitProjectFlow.css';

class ProjectDetails extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Label className="textStyle" for="about">
            *About
          </Label>
          <Input type="textarea" value={this.props.about} onChange={this.props.onChangeAbout} />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="challenges">
            Current Challenges
          </Label>
          <Input
            type="textarea"
            value={this.props.challenges}
            onChange={this.props.onChangeChallenges}
          />
        </FormGroup>
        <div className="textStyle"> *Project Type </div>
        <div>
          <Row>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Startup"
                    type="checkbox"
                    onChange={() => this.props.toggleTypes(0)}
                  />
                  Startup
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Nonprofit"
                    type="checkbox"
                    onChange={() => this.props.toggleTypes(1)}
                  />
                  Nonprofit
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Passion Project"
                    type="checkbox"
                    onChange={() => this.props.toggleTypes(2)}
                  />
                  Passion Project
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Club Project"
                    type="checkbox"
                    onChange={() => this.props.toggleTypes(3)}
                  />
                  Club Project
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="textStyle">*Discipline that your project falls under </div>
        <div>
          <Row>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Arts"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(0)}
                  />
                  Arts
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Community"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(1)}
                  />
                  Community
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Health"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(2)}
                  />
                  Health
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Politics"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(3)}
                  />
                  Politics
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Tech"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(4)}
                  />
                  Tech
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Science"
                    type="checkbox"
                    onChange={() => this.props.toggleDiscipline(5)}
                  />
                  Science
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="textStyle"> *Status </div>
        <div>
          <Row>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Ideation"
                    type="checkbox"
                    onChange={() => this.props.toggleStatus(0)}
                  />
                  Ideation - no product yet
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input title="Beta" type="checkbox" onChange={() => this.props.toggleStatus(1)} />
                  Beta - have an MVP
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Alpha"
                    type="checkbox"
                    onChange={() => this.props.toggleStatus(2)}
                  />
                  Alpha - iterating and testing
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Launched"
                    type="checkbox"
                    onChange={() => this.props.toggleStatus(3)}
                  />
                  Launched!
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
