import React, { Component } from "react";
import { Button } from "reactstrap";
import { auth, db } from "../../../firebase";

class LikeButton extends Component {
  state = {
    isLiked: false,
    likes: 0
  };

  handleLike = () => {
    var likeNum = db.projectLikes(this.props.id, this.props.likes);
    this.setState({ isLiked: true, likes: likeNum });
  };

  // };
  // handleLike = () => {
  //     likes = db.collection('projects').doc(id).get(likes);
  //     if (likes > 0) {
  //         return()
  //     }
  // }
  render() {
    var loggedIn = auth.isLoggedIn();
    if (loggedIn) {
      return (
        <Button
          outline
          color="primary"
          className="float-right"
          size="sm"
          onClick={this.handleLike}
        >
          Like | {this.state.likes}
        </Button>
      );
    } else {
      return (
        <Button
          href="/signupin"
          className="float-right"
          outline
          color="primary"
          size="sm"
        >
          Like | {this.state.likes}
        </Button>
      );
    }
  }
}

export default LikeButton;
