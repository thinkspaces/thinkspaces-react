import React, { Component } from "react";
import { auth, db } from "../../../firebase";

import AuthUserContext from "../../Authentication/AuthUserContext";
import withAuthorization from "../../Authentication/withAuthorization";

import SubmitProjectButton from "../buttons/SubmitProjectButton";

class MyProjects extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    const { uid } = this.props;
    let snapshot = await db.getMyProjects(uid);
    console.log("WHAYTEIOISFLSI");
    //this.setState({ projects: snapshot });
  };

  render() {
    const { projects } = this.state;
    console.log(projects);
    return (
      <div style={{ paddingLeft: 50, paddingRight: 100 }}>
        {projects.length == 0 ? (
          <div>
            <h3>No projects yet. Change that by submitting an idea!</h3>
            <SubmitProjectButton />
          </div>
        ) : (
          <div>
            <h1> projects </h1>
            <div>{projects}</div>
          </div>
        )}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(MyProjects);
