import React from "react";
import "./ProfileCard.css";
import Avatar from "react-avatar";
import ViewProfileButton from "../../buttons/ViewProfileButton";

const Card = ({ width, children }) => (
  <div
    className="profile-card"
    style={{
      width: width <= 690 ? "auto" : "318px"
    }}
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
    <h3>{title}</h3>
  </div>
);

const CardBody = ({ headline, username, uid }) => (
  <div className="profile-cardBody flexed">
    <div className="description-box">
      <p>{headline}</p>
    </div>
    <ViewProfileButton uid={uid} text="View Profile" />
  </div>
);

const ProfileCard = props => (
  <Card width={props.width}>
    <CardImage image={props.picture} title={props.title} />
    <CardTitle title={props.title} />
    <CardBody
      headline={props.headline}
      username={props.username}
      uid={props.uid}
    />
  </Card>
);

export default ProfileCard;
