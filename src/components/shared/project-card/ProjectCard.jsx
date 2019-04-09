/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ProjectCard.css';
import ReactGA from 'react-ga';
import LikeButton from '../like-button';

const Card = ({ width, children, onClick }) => (
  <div onClick={onClick} className="card" style={{ width: width <= 690 ? 'auto' : '318px' }}>
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

const CardTitle = ({ title, likes, pid, updateLikes }) => (
  <div className="card-border">
    <LikeButton
      style={{ verticalAlign: 'right' }}
      likes={likes}
      pid={pid}
      updateLikes={updateLikes}
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

const CardTag = () => (
  <div className="profile-tag">
    <p>Tag</p>
  </div>
);

class ProjectCard extends Component {
  openProject = () => {
    const { history, id, title } = this.props;
    ReactGA.event({ category: 'Engagement', action: 'Clicked on project', label: title });
    history.push(`/projects/${ title.replace(/\s+/g, '-') }?id=${ id }`);
  };

  render() {
    const { width, title, likes, updateLikes, image, id, text } = this.props;
    return (
      <Card width={width} onClick={this.openProject}>
        <CardTitle title={title} likes={likes} pid={id} updateLikes={updateLikes} />
        <CardImage image={image} />
        <CardBody text={text} />
        <CardTag />
      </Card>
    );
  }
}
export default withRouter(ProjectCard);
