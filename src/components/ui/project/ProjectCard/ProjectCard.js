import React from "react";
import sizeMe from "react-sizeme";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import LikeButton from "../Like";

// custom project card without weird margin side affects
//<LikeButton id = {props.id} likes = {props.likes}/>
const ProjectCard = props => {
  return (
    <div
      className="card"
      style={{
        width: props.width <= 768 ? "auto" : "318px",
        minWidth: "200px"
      }}
    >
      <div className="cardBody">
        <LikeButton
          style={{ verticalAlign: "right" }}
          likes={props.likes}
          id={props.id}
          updateLikes={props.updateLikes}
        />
        <h5>{props.title} </h5>
      </div>
      <div className="project-image-container">
        <img
          src={
            props.image
              ? props.image
              : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
          }
          alt="project cover"
        />
      </div>
      <div className="cardBody flexed">
        <div className="description-box">
          <p>{props.text}</p>
        </div>
        <Link
          to={{
            pathname: `projects/${props.shortname}`,
            state: { id: props.id }
          }}
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default sizeMe()(ProjectCard);
