/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import EditProjectImages from '../edit-project-images';

class GeneralProjectInfo extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Label for="title"> Project Name </Label>
          <Input value={this.props.title} onChange={this.props.onChangeTitle} />
        </FormGroup>
        <FormGroup>
          <Label for="links"> Link to your website or social media</Label>
          <Input
            value={this.props.links}
            onChange={this.props.onChangeLinks}
            placeholder="http://www.yourwebsite.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="card_des">Tell us a bit about your project</Label>
          <Input
            type="textarea"
            value={this.props.card_des}
            onChange={this.props.onChangeCardDes}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contact"> Contact Email</Label>
          <Input value={this.props.contact} onChange={this.props.onChangeContact} />
        </FormGroup>
      </div>
    );
  }
}

export default GeneralProjectInfo;
