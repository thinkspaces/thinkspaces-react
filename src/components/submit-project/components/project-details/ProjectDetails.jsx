/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Row, Col, Label, Input, Form } from 'reactstrap';
import '../../SubmitProjectFlow.css';

class ProjectDetails extends Component {
  render() {
    console.log(this.props.types);
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
                    onChange={() => this.props.toggleItem('types', 0)}
                  />
                  Startup
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Nonprofit"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('types', 1)}
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
                    onChange={() => this.props.toggleItem('types', 2)}
                  />
                  Passion Project
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Club Project"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('types', 3)}
                  />
                  Club Project
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
                    onChange={() => this.props.toggleItem('status', 0)}
                  />
                  Ideation - no product yet
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Beta"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('types', 1)}
                  />
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
                    onChange={() => this.props.toggleItem('types', 2)}
                  />
                  Alpha - iterating and testing
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Launched"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('types', 3)}
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
