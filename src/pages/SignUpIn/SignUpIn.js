import React, { Component } from "react";

import Login from '../../containers/SignUpLogin/Login';
import SignUp from '../../containers/SignUpLogin/SignUp';

import { withRouter } from 'react-router-dom';

const fullstyle = {
    margin: "50px 300px 50px 150px",
}

class SignUpIn extends React.Component {
    render(){
        return (
            <div style = {fullstyle}>
                <Login></Login>
                <hr></hr>
                <SignUp></SignUp>
            </div>
        )
    }
}

export default withRouter(SignUpIn);
