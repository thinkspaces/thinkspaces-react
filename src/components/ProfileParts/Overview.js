import React, { Component } from "react";
import { FormGroup, Label, Button, Row, Col, Form, Input } from "reactstrap";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";
import Avatar from 'react-avatar';


class ProfileOverview extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: {
                graduation: "",
            },
            isEditing: false,
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }


    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }

    handleSubmit = event => {
      const { graduation } = this.state;
      const { history } = this.props;

      db
        .editUserOverview(graduation)
        .then(response => {
          this.setState({ graduation: ""});
          console.log(response);
          history.push("/");
        })
        .catch(error => {
          console.log(error);
        });
      event.preventDefault();
    };


    componentDidMount = async () => {
        let profile = await db.getUserProfile();
        this.setState({ profile: profile.data() });
    };

    render() {
        const { profile, graduation } = this.state;
        if (this.state.isEditing === true) {
            return(
                <div>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="graduation">Graduation</Label>
                    <Input
                      type="graduation"
                      value={profile.graduation}
                      onChange={event =>
                        this.setState({ profile : { value: event.target.value}})
                      }
                    />
                  </FormGroup>
                </Form>
                <Button color="danger" > Save </Button>
                </div>
            )
        }
        else{
            return (
                <div>
                <AuthUserContext.Consumer>
                    {authUser =>
                    authUser && (
                      <div>
                        {profile && (
                          <div>
                            <Row>
                                <Col>
                                    <Avatar name = {profile.full_name}/>
                                    <h2>{profile.full_name}</h2>
                                    <br></br>
                                    <h5>{profile.email}</h5>
                                    <h5>Graduation: {profile.graduation}</h5>
                                    <br></br>

                                </Col>
                                <Col>
                                    <h4>Major/School: </h4>
                                    <hr></hr>
                                    <h4>Skills:</h4>
                                    <hr></hr>
                                    <h4>Relevant Courses:</h4>
                                    <hr></hr>
                                    <h4>Interests:</h4>
                                    <br></br>
                                    <Button color="danger" onClick = {this.toggleEdit}> Edit Profile </Button>
                                </Col>
                            </Row>
                          </div>
                        )}
                      </div>
                    )
                }
                </AuthUserContext.Consumer>
                </div>
            );
        }
    }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfileOverview);
