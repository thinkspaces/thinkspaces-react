import React from "react";
import sizeMe from "react-sizeme";
import "./ProfileCard.css";
import Avatar from "react-avatar";
import ViewProfileButton from "../../buttons/ViewProfileButton";

const PostsCard = props => (
  <div
    className="profile-card"
    style={{
      width: props.width <= 768 ? "auto" : "318px",
      minWidth: "200px"
    }}
  >
    <div className="cardTitle">
      <h3>{props.title}</h3>
    </div>
    <div className="profile-cardBody flexed">
      <div className="description-box">
        <p>{props.headline}</p>
      </div>
      <ViewProfileButton
        username={`${props.username}.${props.uid.slice(0, 6)}`}
        uid={props.uid}
        text="View Profile"
      />
    </div>
  </div>
);

export default sizeMe()(ProfileCard);
