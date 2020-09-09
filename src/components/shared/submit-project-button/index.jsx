// Libraries
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Components
import { Button } from "reactstrap";
import SignUpModal from "components/shared/sign-up-modal";

// Utilities
import { auth } from "../../../firebase";

const buttonStyle = { margin: "20px 10px" };

class SubmitProjectButton extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };

  gotoSignUp = () => {
    const { history } = this.props;
    history.push("/signupin");
  };

  render() {
    const { modal } = this.state;
    const loggedIn = auth.isLoggedIn();
    if (loggedIn) {
      return (
        <Button href="/submitproject" style={buttonStyle} color="danger">
          Submit a Project
        </Button>
      );
    }
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

export default withRouter(SubmitProjectButton);
