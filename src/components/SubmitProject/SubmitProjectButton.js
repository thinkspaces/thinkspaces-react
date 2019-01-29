import React, { Component } from "react";

import { Button, FormGroup, Label, Input, Form } from "reactstrap";

import { auth } from '../../firebase';

const buttonStyle = {
  margin: "20px 10px"
};

class SubmitProjectButton extends Component {
    render() {
        var loggedIn = auth.isLoggedIn();
        if (loggedIn){
            return(
                <Button href="/submitproject" style={buttonStyle} color="danger">
                  Submit a Project
                </Button>
            )
        }
        else {
            return (
                <Button href="/signupin" style={buttonStyle} color="danger">
                  Submit a Project
                </Button>
            )
        }
    }
}

export default SubmitProjectButton;
