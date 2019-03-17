import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';

import { Button, Row, Col } from 'reactstrap';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import ProjectCard from '../../components/ui/cards/ProjectCard/ProjectCard';
import SubmitProjectButton from '../../components/ui/buttons/SubmitProjectButton';

import withAuthorization from '../../components/Authentication/withAuthorization';
import { auth, db } from '../../firebase';

const headerStyle = { margin: '50px 0px', textAlign: 'center' };

const buttonStyle = { margin: '20px 10px' };

const trendingStyle = { padding: '5px' };

class Home extends Component {
  state = { projects: [], isAuthUser: false };

  componentDidMount = async () => {
    const projects = await db.getTopProjects();
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

  goToProjects = () => {
    const { history } = this.props;
    history.push('/projects');
  };

  render() {
    const { projects, isAuthUser } = this.state;
    return (
      <BaseContainer>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Change the way you collaborate</h3>
          <Button onClick={this.goToProjects} style={buttonStyle} outline>
            Browse Projects
          </Button>
          <SubmitProjectButton />
        </div>
        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="Fire">
            🔥
          </span>
          &nbsp;Noteworthy
        </h3>
        <SizeMe>
          {({ size }) => (
            <div>
              <Row>
                {projects.slice(0, 3).map((p, i) => (
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
              <h3 style={trendingStyle}>
                <span role="img" aria-label="BikingMan">
                  🚴‍
                </span>
                &nbsp;Up and Coming
              </h3>
              <Row>
                {projects.slice(3, 6).map((p, i) => (
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
            </div>
          )}
        </SizeMe>
      </BaseContainer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Home);
