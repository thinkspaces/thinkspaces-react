import React, { Component } from "react";
import { auth, db } from "../../firebase";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";

import SubmitProjectButton from "../../components/ui/buttons/SubmitProjectButton";

class ManageProjects extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    if (this.props.location.state) {
      let snapshot = await db.getMyProjects(this.props.location.state.uid);
      this.setState({ projects: snapshot });
    }
  };

  render() {
    const { projects } = this.state;
    if (projects.length == 0) {
      return (
        <div>
          <h3>No projects yet. Change that by submitting an idea!</h3>
          <SubmitProjectButton />
        </div>
      );
    } else {
      return (
        <div>
          <div>{projects}</div>
        </div>
      );
    }
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ManageProjects);
