/* eslint camelcase: 0 */
import React from 'react';
import { Icon } from 'react-icons-kit';
import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border';
import { omit } from 'lodash';
import Button from '../button';
import useUser from '../../../hooks/use-user';
import useProject from '../../../hooks/use-project';

const LikeButton = ({ pid }) => {
  const { user } = useUser();
  const { project, updateProject } = useProject(pid);

  const addLike = (e) => {
    e.stopPropagation();
    if (user) {
      let _likes = { ...project.likes };
      if (project.likes[user.id]) {
        _likes = omit(_likes, user.id);
      } else {
        _likes[user.id] = true;
      }
      updateProject({ ...project, likes: _likes });
    }
  };
  return (
    <Button color="steelblue" onClick={addLike}>
      <Icon icon={ic_favorite_border} /> {Object.keys(project && project.likes).length}
    </Button>
  );
};

export default LikeButton;

// /* eslint camelcase: 0 */
// import React, { Component } from 'react';
// import { Button } from 'reactstrap';
// import { Icon } from 'react-icons-kit';
// import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border';
// import { withRouter } from 'react-router-dom';
// import ReactGA from 'react-ga';
// import { db, auth } from '../../../firebase';
// import CantLikeModal from '../cant-like-modal';

// class LikeButton extends Component {
//   state = { isAuthUser: false, isLiked: false, modal: false };

//   componentDidMount = () => {
//     const { likes } = this.props;
//     const user = auth.getUserInfo();
//     let isLiked = false;
//     if (user && likes[user.uid]) {
//       isLiked = true;
//     }

//     this.setState({ isAuthUser: auth.isLoggedIn(), isLiked });
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const isAuthUser = auth.isLoggedIn();
//     if (prevState.isAuthUser !== isAuthUser) {
//       this.setState({ isAuthUser });
//     }
//   };

//   handleLike = async (event) => {
//     event.stopPropagation();
//     const { pid, updateLikes, likes } = this.props;
//     const user = auth.getUserInfo();
//     if (likes[user.uid]) {
//       // remove like
//       delete likes[user.uid];
//       await db.update('projects')(pid)({ likes, likesCount: Object.keys(likes).length });
//       updateLikes(likes);
//       this.setState({ isLiked: false });
//     } else {
//       // give like
//       ReactGA.event({
//         category: 'Engagement',
//         action: 'Clicked on project',
//         label: user.displayName,
//       });
//       likes[user.uid] = true;
//       await db.update('projects')(pid)({ likes, likesCount: Object.keys(likes).length });
//       updateLikes(likes);
//       this.setState({ isLiked: true });
//     }
//   };

//   toggle = (event) => {
//     event.stopPropagation();
//     this.setState(prevState => ({ modal: !prevState.modal }));
//   };

//   gotoSignUp = () => {
//     const { history } = this.props;
//     history.push('/signupin');
//   };

//   render() {
//     const { likes } = this.props;
//     const { isLiked, isAuthUser, modal } = this.state;
//     return (
//       <div>
//         {isAuthUser ? (
//           <Button outline={!isLiked} color="primary" size="sm" onClick={this.handleLike}>
//             <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
//           </Button>
//         ) : (
//           <div className="d-inline">
//             <CantLikeModal isOpen={modal} toggle={this.toggle} signUp={this.gotoSignUp} />
//             <Button className="float-right" color="primary" size="sm" onClick={this.toggle} outline>
//               <Icon icon={ic_favorite_border} /> {Object.keys(likes).length}
//             </Button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default withRouter(LikeButton);
