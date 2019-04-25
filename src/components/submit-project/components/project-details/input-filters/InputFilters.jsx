/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

const _types = [
  { label: 'Startup' },
  { label: 'Nonprofit' },
  { label: 'Passion Project' },
  { label: 'Club Project' },
];

class InputFilters extends Component {
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
          <Label check>
            <Input
              title="Startup"
              type="checkbox"
              state="types"
              onChange={() => this.toggleItem('types', 0)}
            />
            Startup
          </Label>
        </FormGroup>
        <FormGroup>
          <Label check>
            <Input
              title="Nonprofit"
              type="checkbox"
              state="types"
              onChange={() => this.toggleItem('types', 1)}
            />
            Nonprofit
          </Label>
        </FormGroup>
        <FormGroup>
          <Label check>
            <Input
              title="Passion Project"
              type="checkbox"
              state="types"
              onChange={() => this.toggleItem('types', 2)}
            />
            Passion Project
          </Label>
        </FormGroup>
        <FormGroup>
          <Label check>
            <Input
              title="Club Project"
              type="checkbox"
              state="types"
              onChange={() => this.toggleItem('types', 2)}
            />
            Club Project
          </Label>
        </FormGroup>
      </div>
    );
  }
}

export default InputFilters;
