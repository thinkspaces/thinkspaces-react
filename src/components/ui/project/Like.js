import React, { Component } from "react";
import { Button } from "reactstrap";
import { auth, db } from "../../../firebase";
import SignUpModal from "../modals/SignUpModal";
import { Icon } from "react-icons-kit";
import {
  ic_favorite_border,
  ic_favorite
} from "react-icons-kit/md/ic_favorite_border";

class LikeButton extends Component {
  state = {
    isLiked: false
  };

  handleLike = async () => {
    const { id, likes, updateLikes } = this.props;
    const { isLiked } = this.state;
    let user = auth.getUserInfo();
    let uid = user.uid;
    let likesMap = await db.likeStatus(id);
    //console.log("this is the likesMap.uid:", likesMap.uid);
    if (likesMap[uid]) {
      //console.log("deleting");
      delete likesMap[uid];
      //console.log(likesMap);
      db.updateLikes(id, likesMap);
      db.updateLikesCount(id, -1);
      updateLikes();
      this.setState({ isLiked: false });
    } else {
      console.log("adding");
      likesMap[uid] = true;
      //console.log(likesMap);
      db.updateLikes(id, likesMap);
      db.updateLikesCount(id, 1);
      updateLikes();
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
            <Icon icon={ic_favorite_border} /> {likes}
          </Button>
        ) : (
          <Button
            href="/signupin"
            className="float-right"
            color="primary"
            size="sm"
            onClick={<SignUpModal />}
          >
            Like | {this.props.likes}
          </Button>
        )}
      </div>
    );
  }
}

export default LikeButton;
