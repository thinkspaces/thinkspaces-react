import React, { Component } from "react";

import { Icon } from "react-icons-kit";
import { userCircleO } from "react-icons-kit/fa/userCircleO";
import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";
import { Jumbotron, Container } from "reactstrap";

class Profile extends Component {
  state = {
    profile: null
  };

  componentDidMount = async () => {
    let profile = await db.getUserProfile();
    this.setState({ profile: profile.data() });
  };

  render() {
    const { profile } = this.state;
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && (
              <div>
                {profile && (
                  <div>
                    <Jumbotron fluid>
                      <Container fluid>
                        <div className="d-inline-flex">
                          <Icon size={72} icon={userCircleO} />
                          <div style={{ marginLeft: 20 }}>
                            <h1 className="display-4">{profile.full_name}</h1>
                          </div>
                        </div>
                        <p className="lead">{profile.email}</p>

                        <hr className="my-2" />
                        <div>Graduation: {profile.graduation}</div>
                        <div>uid: {authUser.uid}</div>
                      </Container>
                    </Jumbotron>
                  </div>
                )}
              </div>
            )
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
