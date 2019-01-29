import React, {Component} from "react";
import sizeMe from "react-sizeme";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import Avatar from "react-avatar";

// class ProjectAvatar extends Component {
//     render() {
//         image = this.props.image;
//         console.log(image);
//         if (this.props.image == null){
//             return(
//                 <Avatar size="100%" name={this.props.title} />
//             )
//         }
//         else {
//             return (
//                 <img src={this.props.image} alt="Card cap" />
//             )
//         }
//     }
// }


// custom project card without weird margin side affects
class ProjectCard extends Component {
    render() {
        return(
            <div
              className="card"
              style={{
                width: this.props.width <= 768 ? "auto" : "318px"
              }}
            >
              <div className="cardBody">
                <h5>{this.props.title}</h5>
              </div>
              <div className="project-image-container">
                <img src = {this.props.image}/>
              </div>
              <div className="cardBody flexed">
                <div className="description-box">
                  <p>{this.props.text}</p>
                </div>
                <Link
                  to={{
                    pathname: `projects/${this.props.shortname}`,
                    state: { id: this.props.id }
                  }}
                >
                  View Project
                </Link>
              </div>
            </div>
        )
    }
}
//
// const ProjectCard = props => {
//     let image;
//
//     if(props.image == null) {
//          image = <Avatar size="100%" name={props.title} />
//     }
//     else {
//         image = <img src={props.image} alt="Card cap" />
//     }
//
//   return (
//     <div
//       className="card"
//       style={{
//         width: props.width <= 768 ? "auto" : "318px"
//       }}
//     >
//       <div className="cardBody">
//         <h5>{props.title}</h5>
//       </div>
//       <div className="project-image-container">
//         {image}
//       </div>
//       <div className="cardBody flexed">
//         <div className="description-box">
//           <p>{props.text}</p>
//         </div>
//         <Link
//           to={{
//             pathname: `projects/${props.shortname}`,
//             state: { id: props.id }
//           }}
//         >
//           View Project
//         </Link>
//       </div>
//     </div>
//   );
// };

export default sizeMe()(ProjectCard);
