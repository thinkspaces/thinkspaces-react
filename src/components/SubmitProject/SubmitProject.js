import React, { Component } from "react";

// import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";
import ProjectPictures from "./UploadProjectPictures.js";

import { Button, FormGroup, Label, Input, Form } from "reactstrap";

class SubmitProject extends Component {
  state = {
    title: "",
    contact: "",
    about: "",
    card_des: "",
    images: "",
    links: "",
    need: "",
    likes: 0
  };

  createProject = event => {
    event.preventDefault();
    const {
      title,
      contact,
      about,
      card_des,
      images,
      links,
      need,
      likes
    } = this.state;

    const { history } = this.props;

    db.createProjectWithFields({
      title,
      about,
      card_des,
      images: [images],
      links: [links, contact],
      need: [need],
      likes,
      shortname: title.replace(/\s+/g, "-")
    }).then(() => {
      this.setState({
        title: "",
        contact: "",
        about: "",
        card_des: "",
        images: "",
        links: "",
        need: "",
        likes: 0
      });
      history.push("/");
    });
  };

  render() {
    const { title, contact, about, card_des, images, links, need } = this.state;
    return (
      <div>
        <h2> Submit a Project </h2>
        <Form onSubmit={this.createProject}>
          <FormGroup>
            <Label for="title"> Project Name </Label>
            <Input
              value={title}
              onChange={event => this.setState({ title: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contact"> Contact Email</Label>
            <Input
              value={contact}
              onChange={event => this.setState({ contact: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="projectpictures">Add some photos of your project!</Label>
            <ProjectPictures />
          </FormGroup>
          <FormGroup>
            <Label for="card_des">
              Tell us a bit about your project (in one sentence)
            </Label>
            <Input
              value={card_des}
              onChange={event =>
                this.setState({ card_des: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="about">Now tell us a bit more about your project</Label>
            <Input
              value={about}
              onChange={event => this.setState({ about: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="need">
              Most importantly, what type of people are you looking for?
            </Label>
            <Input
              value={need}
              onChange={event => this.setState({ need: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="images">Drop in a photo of your project or logo!</Label>
            <Input
              value={images}
              onChange={event => this.setState({ images: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="links"> Link to your website or social media </Label>
            <Input
              value={links}
              onChange={event => this.setState({ links: event.target.value })}
            />
          </FormGroup>
          <Button color="danger"> Submit </Button>
        </Form>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProject);
