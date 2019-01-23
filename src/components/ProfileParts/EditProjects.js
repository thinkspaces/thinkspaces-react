import React, { Component } from "react";
import { FormGroup, Label, Button, Row, Col, Form, Input } from "reactstrap";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";

//edit projects should have an option to edit or submit a project

class EditProjects extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: null,
            isEditing: false,
        };
    }

    render() {
        const { profile } = this.state;
        if (this.state.isEditing === true) {
            return(
                <div>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="graduation">Graduation</Label>
                    <Input
                      type="graduation"
                      value={profile.graduation}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Form>
                <Button color="danger" > Save </Button>
                </div>
            )
        }
    }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(EditProjects);
