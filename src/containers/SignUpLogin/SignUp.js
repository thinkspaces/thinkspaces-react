import React, { Component } from "react";

import { auth } from '../../firebase';

import { withRouter } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form } from "reactstrap";


class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        error: false
    };

    handleSubmit = event => {
        const { email, password } = this.state;

        const { history } = this.props;

        auth.createUser(email, password).then(() => {
            this.setState({ email: "", password: "", error: false });
            history.push("/");
        })
        .catch(error => {
            console.log(error);
        });
        event.preventDefault();
    };

    render() {
        const {email, password, error } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;
        return(
            <div>
                <h2> Sign Up </h2>
                <Form onSubmit = {this.handleSubmit}>
                    <FormGroup>
                        <Label for="SignUpEmail">Email</Label>
                        <Input
                            type = "email"
                            value = {email}
                            onChange = {event => this.setState({ email: event.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="SignUpPassword">Password</Label>
                        <Input
                            type = "password"
                            value = {password}
                            onChange = {event => this.setState({ password: event.target.value})}/>
                    </FormGroup>
                    <Button disabled = {!isEnabled} color = "danger" >Submit</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(SignUp);
