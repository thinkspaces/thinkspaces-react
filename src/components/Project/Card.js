import React from "react";
import sizeMe from "react-sizeme";
import { Link } from "react-router-dom";
import "./Card.css";
// import { Card, CardText, CardBody, CardLink, CardTitle } from "reactstrap";

// const BoxSize = {
//   height: "420px",
//   width: "290px",
//   display: "inline-block"
// };

// custom project card without weird margin side affects
const ProjectCard = props => {
  return (
    <div
      className="card"
      style={{
        width: props.width <= 768 ? "auto" : "318px"
      }}
    >
      <div className="cardBody">
        <h5>{props.title}</h5>
      </div>
      <div className="image-container">
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

// const ProjectCard = props => {
//   let shortname = "#";
//   let title = "Card title";
//   let image =
//     "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
//   let text = " text here ";
//   if (props.shortname) {
//     shortname = "projects/" + props.shortname;
//   }
//   if (props.title) {
//     title = props.title;
//   }
//   if (props.text) {
//     text = props.text;
//   }
//   if (props.image) {
//     image = props.image;
//   }

//   return (
//     <Card style={BoxSize}>
//       <CardBody>
//         <CardTitle>{title}</CardTitle>
//       </CardBody>
//       <img width="288px" height="163px" src={image} alt="Card cap" />
//       <CardBody>
//         <CardText>{text}</CardText>
//         <CardLink href={shortname}>View Project</CardLink>
//       </CardBody>
//     </Card>
//   );
// };

export default sizeMe()(ProjectCard);
