import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';

let unsubscribe;

const LoadingView = () => (
  <div
    style={{ display: 'flex',
      height: '100vh',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' }}
  >
    Loading ...
  </div>
);

const checkAuthorization = (WrappedComponent) => {
  class WithAuthorization extends Component {
    state = { loading: true, submitting: false };

    componentDidMount() {
      const { history } = this.props;
      unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
        const { submitting } = this.state;
        if (authUser && !submitting) {
          history.push('/home');
        }
        this.setState({ loading: false });
      });
    }

    componentWillUnmount = () => unsubscribe();

    onSubmit = () => this.setState({ submitting: true });

    render() {
      const { loading, submitting } = this.state;

      if (loading) {
        return <LoadingView />;
      }
      return <WrappedComponent {...this.props} submitting={submitting} onSubmit={this.onSubmit} />;
    }
  }
  return withRouter(WithAuthorization);
};

export default checkAuthorization;
