import React from "react";
import sizeMe from "react-sizeme";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

// custom project card without weird margin side affects
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
        <h5>{props.title}</h5>
      </div>
      <div className="project-image-container">
        <img src={props.image} alt="Card cap" />
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
