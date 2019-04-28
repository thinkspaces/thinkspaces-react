/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

class ProjectDetails extends Component {
  render() {
    console.log(this.props.types);
    return (
      <div>
        <FormGroup>
          <Label for="about">Now tell us a bit more about your project</Label>
          <Input type="textarea" value={this.props.about} onChange={this.props.onChangeAbout} />
        </FormGroup>
        <h3> Project Type </h3>
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
              onChange={() => this.props.toggleItem('types', 2)}
            />
            Club Project
          </Label>
        </FormGroup>
      </div>
    );
  }
}

export default ProjectDetails;
