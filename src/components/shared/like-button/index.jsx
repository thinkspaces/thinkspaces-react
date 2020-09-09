/* eslint camelcase: 0 */
// Libraries
import React from "react";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { omit } from "lodash";

// Components
import { Icon } from "react-icons-kit";
import Button from "components/shared/button";

// Hooks
import useUser from "hooks/use-user";
import useProject from "hooks/use-project";

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
    <Button variant="outlined" color="#0058FF" onClick={addLike}>
      <Icon icon={ic_favorite_border} />{" "}
      {Object.keys(project && project.likes).length}
    </Button>
  );
};

export default LikeButton;
