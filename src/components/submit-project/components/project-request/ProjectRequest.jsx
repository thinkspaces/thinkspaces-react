/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, Form } from 'reactstrap';

class ProjectRequest extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Label for="need">Most importantly, what type of people are you looking for?</Label>
          <Input type="textarea" value={this.props.need} onChange={this.props.onChangeNeed} />
        </FormGroup>
        <div>
          <Row>
            <Col>
              <h5>Skills Needed</h5>
              <FormGroup>
                <Label check>
                  <Input
                    title="Analysis"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 0)}
                  />
                  Analysis
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Graphic Design"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 1)}
                  />
                  Graphic Design
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Film"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 2)}
                  />
                  Film
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Writing"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 3)}
                  />
                  Writing
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label check>
                  <Input
                    title="Marketing"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 4)}
                  />
                  Marketing
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Programming"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 5)}
                  />
                  Programming
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Engineering"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 6)}
                  />
                  Engineering
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Research"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 7)}
                  />
                  Research
                </Label>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input
                    title="Management"
                    type="checkbox"
                    onChange={() => this.props.toggleItem('skills', 8)}
                  />
                  Management
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </div>

        <h5>Commitment Level</h5>
        <FormGroup>
          <Label check>
            <Input
              title="High"
              type="checkbox"
              onChange={() => this.props.toggleItem('commitments', 0)}
            />
            High
          </Label>
        </FormGroup>
        <FormGroup>
          <Label check>
            <Input
              title="Medium"
              type="checkbox"
              onChange={() => this.props.toggleItem('commitments', 1)}
            />
            Medium
          </Label>
        </FormGroup>
        <FormGroup>
          <Label check>
            <Input
              title="Low"
              type="checkbox"
              onChange={() => this.props.toggleItem('commitments', 2)}
            />
            Low
          </Label>
        </FormGroup>
      </div>
    );
  }
}

export default ProjectRequest;
