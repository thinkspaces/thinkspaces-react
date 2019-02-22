/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border';
import { auth, db } from '../../../firebase';

class LikeButton extends Component {
  state = { isAuthUser: false, isLiked: false };

  componentDidMount = () => {
    this.setState({ isAuthUser: auth.isLoggedIn() });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const isAuthUser = auth.isLoggedIn();
    if (prevState.isAuthUser !== isAuthUser) {
      this.setState({ isAuthUser });
    }
  };

  handleLike = async () => {
    const { pid, updateLikes, likes } = this.props;
    const { user: { uid } } = auth.getUserInfo();

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
    const { isLiked, isAuthUser } = this.state;
    return (
      <div>
        {isAuthUser ? (
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
            disabled
            outline
          >
            <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
          </Button>
        )}
      </div>
    );
  }
}

export default LikeButton;
