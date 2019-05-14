/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ProjectCard.css';
import ReactGA from 'react-ga';
import { Row, Col } from 'reactstrap';
import LikeButton from '../like-button';

const Card = ({ width, children, onClick }) => (
  <div onClick={onClick} className="card" style={{ width: width <= 690 ? 'auto' : '318px' }}>
    {children}
  </div>
);

const CardImage = ({ image }) => (
  <div className="project-image-container">
    <img src={image || 'https://via.placeholder.com/300'} alt="project cover" />
  </div>
);

const CardTitle = ({ title, likes, pid, updateLikes }) => (
  <div className="card-border">
    <div id="project-title">
      <h4>{title}</h4>
    </div>
  </div>
);

const CardBody = ({ text }) => (
  <div className="card-border card-body flexed">
    <div className="description-box">
      <h5 style={{ lineHeight: 1.3 }}>{text}</h5>
    </div>
  </div>
);

const CardTag = ({ title }) => (
  <div className="card-tag">
    <span>#{title}</span>
  </div>
);

class ProjectCard extends Component {
  openProject = () => {
    const { history, id, title, shortname } = this.props;
    ReactGA.event({ category: 'Engagement', action: 'Clicked on project', label: title });
    if (shortname !== undefined) { history.push(`/projects/${ shortname }`) }
  };

  render() {
    const { width, name, likes, updateLikes, image, id, text } = this.props;
    return (
      <div>
        <Card width={width} onClick={this.openProject}>
          <Row>
            <Col>
              <CardTitle title={name} likes={likes} pid={id} updateLikes={updateLikes} />
              <CardTag title="tech" />
            </Col>
            {image != null ? <CardImage image={image} /> : <p />}
          </Row>
          <CardBody text={text} />
          {/* <div className="like-button">
            <LikeButton likes={likes} pid={id} updateLikes={updateLikes} />
          </div> */}
        </Card>
      </div>
    );
  }
}
export default withRouter(ProjectCard);
