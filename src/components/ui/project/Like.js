import React, { Component } from "react";
import { Button } from "reactstrap";
import { auth, db } from "../../../firebase";
import SignUpModal from "../modals/SignUpModal";
import { Icon } from "react-icons-kit";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";

class LikeButton extends Component {
  state = {
    isLiked: false
  };

  handleLike = async () => {
    const { pid, updateLikes, likes } = this.props;
    let uid = auth.getUserInfo().uid;

    if (likes[uid]) {
      // remove like
      delete likes[uid];
      await db.updateLikes(pid, likes);
      updateLikes(likes);
      this.setState({ isLiked: false });
    } else {
      // give like
      likes[uid] = true;
      await db.updateLikes(pid, likes);
      updateLikes(likes);
      this.setState({ isLiked: true });
    }
  };

  render() {
    const { likes } = this.props;
    const { isLiked } = this.state;
    return (
      <div>
        {auth.isLoggedIn() ? (
          <Button
            outline={!isLiked}
            color="primary"
            className="float-right"
            size="sm"
            onClick={this.handleLike}
          >
            <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
          </Button>
        ) : (
          <Button
            href="/signupin"
            className="float-right"
            color="primary"
            size="sm"
            onClick={<SignUpModal />}
          >
            <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
          </Button>
        )}
      </div>
    );
  }
}

export default LikeButton;
