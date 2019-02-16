import React, { Component } from "react";
import { db } from "../../../../firebase";

import SubmitProjectButton from "../../buttons/SubmitProjectButton";

class MyProjects extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const { uid } = this.props;
    let projects = await db.getMyProjects(uid);
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    return (
      <div style={{ paddingLeft: 50, paddingRight: 100 }}>
        {projects.length === 0 ? (
          <div>
            <h3>No projects yet. Change that by submitting an idea!</h3>
            <SubmitProjectButton />
          </div>
        ) : (
          <div>
            {projects.map((proj, i) => (
              <div key={i}>{proj.title}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MyProjects;
