import React, { Component } from "react";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";

import { Button, FormGroup, Label, Input, Form } from "reactstrap";

//if logged in users can submit their project here.
//else they will be led to make an account first

//do you think we will need to make a shortname?
//i guess we would make that an additional db function...

//ahh maybe make the form where there are different sections and you can save what you have so far

//going to have to work on how to do image submissions

class SubmitProject extends Component {
    state = {
        title: "",
        //shortname: "",
        contact: "",
        about: "",
        card_des: "",
        images: "",
        links: "",
        need: ""
    };

    handleSubmit = event => {
        const {
            title,
            //shortname: "",
            contact,
            about,
            card_des,
            images,
            links,
            need,
        } = this.state;

        const { history } = this.props;

        db
        .createProjectWithFields (
            title,
            contact,
            about,
            card_des,
            images,
            links,
            need
        ).then (() => {
            this.setState({
                title: "",
                //shortname: "",
                contact: "",
                about: "",
                card_des: "",
                images: "",
                links: "",
                need: ""
            });
            history.push("/");
        });
    };

    render() {
        const {
            title,
            //shortname: "",
            contact,
            about,
            card_des,
            images,
            links,
            need,
        } = this.state;
        return(
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                    <div>
                        <h2> Submit a Project </h2>
                        <Form onSubmit = {this.handleSubmit}>
                            <FormGroup>
                                <Label for="title"> Project Name </Label>
                                <Input
                                  type="title"
                                  value={title}
                                  onChange={event => this.setState({ title: event.target.value })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="contact"> Contact Email</Label>
                                <Input
                                  type="contact"
                                  value={contact}
                                  onChange={event => this.setState({ contact: event.target.value })}
                                  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="card_des"> Tell us a bit about your project (in one sentence) </Label>
                                <Input
                                  type="card_des"
                                  value={card_des}
                                  onChange={event => this.setState({ card_des: event.target.value })}
                                  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="about"> Now tell us a bit more about your project </Label>
                                <Input
                                  type="about"
                                  value={about}
                                  onChange={event => this.setState({ about: event.target.value })}
                                  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="need"> Most importantly, what type of people are you looking for? </Label>
                                <Input
                                  type="need"
                                  value={need}
                                  onChange={event => this.setState({ need: event.target.value })}
                                  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="images"> Drop in a photo of your project or logo! </Label>
                                <Input
                                  type="images"
                                  value={images}
                                  onChange={event => this.setState({ images: event.target.value })}
                                  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="links"> Link to your website or social media </Label>
                                <Input
                                  type="links"
                                  value={links}
                                  onChange={event => this.setState({ links: event.target.value })}
                                  />
                            </FormGroup>
                            <Button color="danger"> Submit </Button>
                        </Form>
                    </div>
                ) :
                (
                    <div>
                        <h2> Sign up or Login first</h2>
                        <Button color="danger" href="/signupin"> Sign Up/In </Button>
                    </div>
                )
              }
            </AuthUserContext.Consumer>
        )
    }

}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(SubmitProject);
