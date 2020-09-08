/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
// Libraries
import React from "react";

// Components
import Avatar from "react-avatar";

// Styles
import "./styles.css";

const Card = ({ width, children, onClick }) => (
  <div
    onClick={onClick}
    className="profile-card"
    style={{ width: width <= 690 ? "auto" : "318px" }}
  >
    {children}
  </div>
);

const CardImage = ({ image, title }) => (
  <div className="image-container">
    {image ? (
      <img src={image} alt="profile" size="140" />
    ) : (
      <Avatar size="150" name={title} round />
    )}
  </div>
);

const CardTitle = ({ title }) => (
  <div className="cardTitle">
    <div id="profile-title">
      <h3>{title}</h3>
    </div>
  </div>
);

const CardBody = ({ headline }) => (
  <div className="card-border flexed">
    <div className="description-box">
      <p>{headline}</p>
    </div>
  </div>
);

const CardTag = () => (
  <div className="profile-tag">
    <p>Tag</p>
  </div>
);

const ProfileCard = ({ width, picture, title, headline, openProfile }) => (
  <Card width={width} onClick={openProfile}>
    <CardImage image={picture} title={title} />
    <CardTitle title={title} />
    <CardBody headline={headline} />
    <CardTag />
  </Card>
);

export default ProfileCard;
