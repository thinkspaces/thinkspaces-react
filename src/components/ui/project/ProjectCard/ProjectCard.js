import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';
import LikeButton from '../../buttons/Like';

const Card = ({ width, children }) => (
  <div className="card" style={{ width: width <= 690 ? 'auto' : '318px' }}>
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
  <div className="cardBody">
    <LikeButton
      style={{ verticalAlign: 'right' }}
      likes={likes}
      pid={pid}
      updateLikes={updateLikes}
    />
    <h5>{title} </h5>
  </div>
);

const ViewProjectButton = ({ id, shortname }) => (
  <Link to={`/projects/${ shortname }?id=${ id }`}>View Project</Link>
);

const CardBody = ({ text, shortname, id }) => (
  <div className="cardBody flexed">
    <div className="description-box">
      <p>{text}</p>
    </div>
    <ViewProjectButton id={id} shortname={shortname} />
  </div>
);

const ProjectCard = ({ width, title, likes, updateLikes, image, text, shortname, id }) => (
  <Card width={width}>
    <CardTitle title={title} likes={likes} pid={id} updateLikes={updateLikes} />
    <CardImage image={image} />
    <CardBody text={text} shortname={shortname} id={id} />
  </Card>
);

export default ProjectCard;
