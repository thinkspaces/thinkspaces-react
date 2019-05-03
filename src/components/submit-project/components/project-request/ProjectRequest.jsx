/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import '../../SubmitProjectFlow.css';

class ProjectRequest extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Label className="textStyle" for="role">
            *Most importantly, what is the role you are trying to fill?
          </Label>
          <Input
            className="inputStyle"
            value={this.props.role}
            onChange={this.props.onChangeRole}
          />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="need">
            *Description of need
          </Label>
          <Input type="textarea" value={this.props.need} onChange={this.props.onChangeNeed} />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="communication">
            *Description of meeting & communication style
          </Label>
          <Input
            type="textarea"
            value={this.props.communication}
            onChange={this.props.onChangeCommunication}
          />
        </FormGroup>

        <div className="textStyle">*Recommended Commitment Level</div>
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
