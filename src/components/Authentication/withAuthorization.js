import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

let unsubscribe;

const withAuthorization = authCondition => (WrappedComponent) => {
  class WithAuthorization extends Component {
    componentDidMount() {
      const { history } = this.props;
      unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          history.push('/');
        }
      });
    }

    componentWillUnmount = () => unsubscribe();

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <WrappedComponent {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(WithAuthorization);
};

export default withAuthorization;
