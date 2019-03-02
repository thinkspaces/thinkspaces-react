/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import CantLikeModal from '../modals/CantLikeModal';

class LikeButton extends Component {
  state = { isLiked: false, modal: false };

  componentDidMount = () => {
    const { likes } = this.props;
    const user = auth.getUserInfo();
    let isLiked = false;
    if (user && likes[user.uid]) {
      isLiked = true;
    }

    this.setState({ isLiked });
  };

  handleLike = async (event) => {
    event.stopPropagation();
    const { pid, updateLikes, likes } = this.props;
    const user = auth.getUserInfo();

    if (likes[user.uid]) {
      // remove like
      delete likes[user.uid];
      await db.updateLikes(pid, likes);
      updateLikes(likes);
      this.setState({ isLiked: false });
    } else {
      // give like
      likes[user.uid] = true;
      await db.updateLikes(pid, likes);
      updateLikes(likes);
      this.setState({ isLiked: true });
    }
  };

  toggle = (event) => {
    event.stopPropagation();
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  gotoSignUp = () => {
    const { history } = this.props;
    history.push('/signupin');
  };

  render() {
    const { likes, isAuthUser } = this.props;
    const { isLiked, modal } = this.state;
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
          <div>
            <CantLikeModal isOpen={modal} toggle={this.toggle} signUp={this.gotoSignUp} />
            <Button className="float-right" color="primary" size="sm" onClick={this.toggle} outline>
              <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(LikeButton);
