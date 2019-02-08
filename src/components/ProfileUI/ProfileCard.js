import React from "react";
import sizeMe from "react-sizeme";
import "./ProfileCard.css";
import Avatar from "react-avatar";
import ViewProfileButton from "./ViewProfileButton";

// {props.picture ? (
//   <img src={props.picture} alt="profile" />
// ) : (
//   <Avatar size="100%" name={props.title} />
// )}

const ProfileCard = props => (
  <div
    className="profile-card"
    style={{
      width: props.width <= 768 ? "auto" : "318px",
      minWidth: "200px"
    }}
  >
    <div className="image-container">
        <Avatar size="100%" name={props.title} />
    </div>
    <div className="cardTitle">
      <h5>{props.title}</h5>
    </div>
    <div className="profile-cardBody flexed">
      <div className="description-box">
        <p>{props.headline}</p>
      </div>
      <ViewProfileButton
        username={`${props.username}.${props.uid.slice(0, 6)}`}
        uid={props.uid}
      />
    </div>
  </div>
);

export default sizeMe()(ProfileCard);
