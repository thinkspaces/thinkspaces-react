import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase";
import SignUpModal from "../Modals/SignUpModal";

class ViewProfileButton extends Component {
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
    const { username, uid } = this.props;
    let loggedIn = auth.isLoggedIn();
    if (loggedIn) {
      return (
        <Link
          to={{
            pathname: `profile/${username}`,
            state: { uid }
          }}
        >
          View Profile
        </Link>
      );
    } else {
      return (
        <div className="d-inline">
          <SignUpModal
            isOpen={modal}
            toggle={this.toggle}
            signUp={this.gotoSignUp}
          />
          <button className="view-button" onClick={this.toggle}>
            View Profile
          </button>
        </div>
      );
    }
  }
}

export default withRouter(ViewProfileButton);
