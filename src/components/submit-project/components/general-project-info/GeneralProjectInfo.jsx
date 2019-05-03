/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import EditProjectImages from '../edit-project-images';
import '../../SubmitProjectFlow.css';

class GeneralProjectInfo extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Label className="textStyle" for="title">
            *Project Name
          </Label>
          <Input
            className="inputStyle"
            value={this.props.title}
            onChange={this.props.onChangeTitle}
          />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="location">
            *Where are you based?
          </Label>
          <Input
            className="inputStyle"
            value={this.props.locations}
            onChange={this.props.onChangeLocation}
          />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="contact">
            {' '}
            *Contact Email
          </Label>
          <Input
            className="inputStyle"
            value={this.props.contact}
            onChange={this.props.onChangeContact}
          />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="card_des">
            *One-liner descripiton of your project
          </Label>
          <Input
            className="inputStyle"
            type="textarea"
            value={this.props.card_des}
            onChange={this.props.onChangeCardDes}
          />
        </FormGroup>
        <FormGroup>
          <Label className="textStyle" for="links">
            {' '}
            Link to your website or social media
          </Label>
          <Input
            className="inputStyle"
            value={this.props.links}
            onChange={this.props.onChangeLinks}
            placeholder="http://www.yourwebsite.com"
          />
        </FormGroup>
      </div>
    );
  }
}

export default GeneralProjectInfo;
