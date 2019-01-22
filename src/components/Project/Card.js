import React from "react";
import sizeMe from "react-sizeme";
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
      style={{
        width: props.width <= 768 ? "auto" : "318px",
        height: 420,
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(33,33,33,.2)",
        borderRadius: ".25rem",
        marginBottom: 10
      }}
    >
      <div className="cardBody" style={{ padding: 20 }}>
        <h5>{props.title}</h5>
      </div>
      <img
        style={{ maxWidth: "316px", maxHeight: "163px" }}
        src={props.image}
        alt={"Card cap"}
      />
      <div className="cardBody" style={{ padding: 20 }}>
        <p>{props.text}</p>
        <a href={`projects/${props.shortname}`}>View Project</a>
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
