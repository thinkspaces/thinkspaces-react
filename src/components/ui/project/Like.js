import React, { Component } from "react";
import { Button } from "reactstrap";
import { auth, db } from "../../../firebase";
import withAuthorization from "../../Authentication/withAuthorization";
import AuthUserContext from "../../Authentication/AuthUserContext";
import SignUpModal from "../modals/SignUpModal";

class LikeButton extends Component {
  state = {
    isLiked: false
  };

  handleLike = async () => {
    const { id, likes, updateLikes } = this.props;
    await db.projectLikes(id, likes);
    this.setState({ isLiked: true });
    updateLikes();
  };

  componentDidMount = async () => {
    if (this.props.location.state) {
      let uid = this.props.location.state.uid;
      let profile = await db.getUserProfile(uid);
      this.setState({ uid, profile: profile.data() });
    }
  };

  // };
  // handleLike = () => {
  //     likes = db.collection('projects').doc(id).get(likes);
  //     if (likes > 0) {
  //         return()
  //     }
  // }
  render() {
    const { likes } = this.props;
    const { isLiked } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {authUser.uid ? (
              <Button
                outline={!isLiked}
                color="primary"
                className="float-right"
                size="sm"
                onClick={this.handleLike}
              >
                Like | {likes}
              </Button>
            ) : (
              <Button
                href="/signupin"
                className="float-right"
                id={authUser.uid}
                color="primary"
                size="sm"
                onClick={<SignUpModal />}
              >
                Like | {this.state.likes}
              </Button>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(LikeButton);
