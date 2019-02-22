import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../../firebase';
import SignUpModal from '../modals/SignUpModal';

class ViewProfileButton extends Component {
  state = { modal: false, loggedIn: false };

  componentDidMount = () => {
    this.setState({ loggedIn: auth.isLoggedIn() });
  };

  toggle = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  gotoSignUp = () => {
    const { history } = this.props;
    history.push('/signupin');
  };

  render() {
    const { modal, loggedIn } = this.state;
    const { uid, text } = this.props;

    if (loggedIn) {
      return <Link to={`/profile/${ uid }`}>{text}</Link>;
    }
    return (
      <div className="d-inline">
        <SignUpModal isOpen={modal} toggle={this.toggle} signUp={this.gotoSignUp} />
        <button type="button" className="view-button" onClick={this.toggle}>
          {text}
        </button>
      </div>
    );
  }
}

export default withRouter(ViewProfileButton);
