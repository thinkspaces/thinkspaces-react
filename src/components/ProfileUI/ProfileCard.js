import React from "react";
import sizeMe from "react-sizeme";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "react-avatar";

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
      <Link
        to={{
          pathname: `profile/${props.username}.${props.uid.slice(0, 6)}`,
          state: { uid: props.uid }
        }}
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default sizeMe()(ProfileCard);
