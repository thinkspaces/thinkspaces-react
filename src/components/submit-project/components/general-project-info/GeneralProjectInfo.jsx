/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

const _types = [
  { label: 'Startup' },
  { label: 'Nonprofit' },
  { label: 'Passion Project' },
  { label: 'Club Project' },
];

class ProjectRequest extends Component {
  state = { types: [] };

  componentDidMount = () => {
    this.setState({ types: _types.map(item => ({ ...item, checked: false })) });
  };

  toggleItem = (type, index) => {
    const items = [ ...this.state[type] ];
    items[index].checked = !items[index].checked;
    this.setState({ [type]: items });
  };

  toggle = type => this.setState(prevState => ({ [type]: !prevState[type] }));

  render() {
    const { types } = this.state;
    console.log(this.state.types);
    return (
      <div>
        <FormGroup>
          <Label for="title"> Project Name </Label>
          <Input value={title} onChange={event => this.setState({ title: event.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="links"> Link to your website or social media</Label>
          <Input
            value={links}
            onChange={event => this.setState({ links: event.target.value })}
            placeholder="http://www.yourwebsite.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="card_des">Tell us a bit about your project</Label>
          <Input
            type="textarea"
            value={card_des}
            onChange={event => this.setState({ card_des: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contact"> Contact Email</Label>
          <Input
            value={contact}
            onChange={event => this.setState({ contact: event.target.value })}
          />
        </FormGroup>
      </div>
    );
  }
}

export default ProjectRequest;
