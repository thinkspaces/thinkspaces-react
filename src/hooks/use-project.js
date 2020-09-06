/* eslint react-hooks/exhaustive-deps: 0 */
// Libraries
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Utilities
import {
  getProject,
  updateProject,
  createProject,
  deleteProject,
} from "components/app/actions";

export default (pid = null) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.data.projects[pid]);
  const tags = useSelector(
    (state) => project && project.tags.map((tag) => state.data.tags[tag])
  );
  const actions = bindActionCreators(
    { getProject, updateProject, createProject, deleteProject },
    dispatch
  );

  useEffect(() => {
    if (pid) {
      actions.getProject(pid);
    }
  }, [pid]);

  return { project, tags, ...actions };
};
