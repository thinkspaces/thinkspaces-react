import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';

import { Row, Col } from 'reactstrap';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import { auth, db } from '../../firebase';
import withAuthorization from '../../components/Authentication/withAuthorization';

// custom components
import ProjectCard from '../../components/ui/cards/ProjectCard/ProjectCard';

// styles
const headerStyle = { marginBottom: '20px' };

class Projects extends Component {
  state = { projects: [], isAuthUser: false };

  componentDidMount = async () => {
    const projects = await db.getProjects();
    const isAuthUser = await auth.isLoggedIn();
    this.setState({ projects, isAuthUser });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const isAuthUser = await auth.isLoggedIn();
    if (prevState.isAuthUser !== isAuthUser) {
      this.setState({ isAuthUser });
    }
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  render() {
    const { projects, isAuthUser } = this.state;
    return (
      <BaseContainer>
        <h2 style={headerStyle}>All Projects</h2>
        <SizeMe>
          {({ size }) => (
            <Row>
              {projects.map((p, i) => (
                <Col sm key={i}>
                  <ProjectCard
                    width={size.width}
                    key={i}
                    id={p.id}
                    title={p.title}
                    image={p.images[0]}
                    text={p.card_des}
                    likes={p.likes}
                    updateLikes={likes => this.updateLikes(likes, i)}
                    isAuthUser={isAuthUser}
                  />
                </Col>
              ))}
            </Row>
          )}
        </SizeMe>
      </BaseContainer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Projects);
