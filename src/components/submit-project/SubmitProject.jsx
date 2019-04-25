/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import withAuthorization from '../utils/withAuthorization';
import { db } from '../../firebase';
import InputFilters from './components/input-filters';

class SubmitProject extends Component {
  state = { title: '', contact: '', about: '', card_des: '', links: '', need: '' };

  createProject = async (event) => {
    event.preventDefault();

    // prepare the fields
    const { title, contact, about, card_des, links, need } = this.state;
    const { history } = this.props;

    await db.createProjectWithFields({ title, about, card_des, contact, links, need });
    await // reset form
    this.setState({ title: '', contact: '', about: '', card_des: '', links: '', need: '' });

    history.push('/');
  };

  render() {
    const { title, contact, about, card_des, links, need, category } = this.state;
    return (
      <>
        <h2> Submit a Project </h2>
        <Form onSubmit={this.createProject}>
          <FormGroup>
            <Label for="title"> Project Name </Label>
            <Input value={title} onChange={event => this.setState({ title: event.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="contact"> Contact Email</Label>
            <Input
              value={contact}
              onChange={event => this.setState({ contact: event.target.value })}
            />
          </FormGroup>
          Choose your project category
          <InputFilters />
          <FormGroup>
            <Label for="card_des">Tell us a bit about your project</Label>
            <Input
              type="textarea"
              value={card_des}
              onChange={event => this.setState({ card_des: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="about">Now tell us a bit more about your project</Label>
            <Input
              type="textarea"
              value={about}
              onChange={event => this.setState({ about: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="need">Most importantly, what type of people are you looking for?</Label>
            <Input
              type="textarea"
              value={need}
              onChange={event => this.setState({ need: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="links"> Link to your website or social media</Label>
            <Input
              value={links}
              onChange={event => this.setState({ links: event.target.value })}
              placeholder="http://www.yourwebsite.com"
            />
          </FormGroup>
          <Button color="danger"> Submit </Button>
        </Form>
      </>
    );
  }
}

// const authCondition = authUser => !!authUser;
// export default withAuthorization(authCondition)(SubmitProject);
