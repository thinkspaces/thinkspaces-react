/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import CantLikeModal from '../modals/CantLikeModal';

class LikeButton extends Component {
  state = { isAuthUser: false, isLiked: false, modal: false };

  componentDidMount = () => {
    const { likes } = this.props;
    const user = auth.getUserInfo();
    let isLiked = false;
    if (user !== null && likes[user.uid]) {
      isLiked = true;
    }
    this.setState({ isAuthUser: auth.isLoggedIn(), isLiked });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const isAuthUser = auth.isLoggedIn();
    if (prevState.isAuthUser !== isAuthUser) {
      this.setState({ isAuthUser });
    }
  };

  handleLike = async (event) => {
    event.preventDefault();
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

  toggle = () => {
    console.log('toggle');
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  gotoSignUp = () => {
    console.log('signing');
    const { history } = this.props;
    history.push('/signupin');
  };

  render() {
    const { likes } = this.props;
    const { isLiked, isAuthUser, modal } = this.state;
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
          <div className="d-inline">
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
