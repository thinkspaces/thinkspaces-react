/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ProjectCard.css';
import LikeButton from '../../buttons/Like';

const Card = ({ width, children, onClick }) => (
  <div
    onClick={onClick}
    className="project-card"
    style={{ width: width <= 690 ? 'auto' : '318px' }}
  >
    {children}
  </div>
);

const CardImage = ({ image }) => (
  <div className="project-image-container">
    <img
      src={image || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'}
      alt="project cover"
    />
  </div>
);

const CardTitle = ({ title, likes, pid, updateLikes, isAuthUser }) => (
  <div className="card-border">
    <LikeButton
      style={{ verticalAlign: 'right' }}
      likes={likes}
      pid={pid}
      updateLikes={updateLikes}
      isAuthUser={isAuthUser}
    />
    <div id="project-title">
      <h5>{title}</h5>
    </div>
  </div>
);

const CardBody = ({ text }) => (
  <div className="card-border card-body flexed">
    <div className="description-box">
      <p>{text}</p>
    </div>
  </div>
);

class ProjectCard extends Component {
  openProject = () => {
    const { history, id, title } = this.props;
    history.push(`/projects/${ title.replace(/\s+/g, '-') }?id=${ id }`);
  };

  render() {
    const { width, title, likes, updateLikes, image, id, text, isAuthUser } = this.props;
    return (
      <Card width={width} onClick={this.openProject}>
        <CardTitle
          title={title}
          likes={likes}
          pid={id}
          updateLikes={updateLikes}
          isAuthUser={isAuthUser}
        />
        <CardImage image={image} />
        <CardBody text={text} />
      </Card>
    );
  }
}
export default withRouter(ProjectCard);