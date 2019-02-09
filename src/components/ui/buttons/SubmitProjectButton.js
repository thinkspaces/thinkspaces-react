import React, { Component } from "react";

import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import SignUpModal from "../modals/SignUpModal";

import { auth } from "../../../firebase";

const buttonStyle = {
  margin: "20px 10px"
};

class SubmitProjectButton extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  gotoSignUp = () => {
    const { history } = this.props;
    history.push("/signupin");
  };

  render() {
    const { modal } = this.state;
    var loggedIn = auth.isLoggedIn();
    if (loggedIn) {
      return (
        <Button href="/submitproject" style={buttonStyle} color="danger">
          Submit a Project
        </Button>
      );
    } else {
      return (
        <div className="d-inline">
          <SignUpModal
            isOpen={modal}
            toggle={this.toggle}
            signUp={this.gotoSignUp}
          />
          <Button onClick={this.toggle} style={buttonStyle} color="danger">
            Submit a Project
          </Button>
        </div>
      );
    }
  }
}

export default withRouter(SubmitProjectButton);
