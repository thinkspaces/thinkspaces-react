import React, { Component } from "react";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";

//if logged in users can submit their project here.
//else they will be led to make an account first

class SubmitProject extends Component {
    render() {
        return(
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (

                ) :
                (

                )
              }
            </AuthUserContext.Consumer>
        )
    }

}
