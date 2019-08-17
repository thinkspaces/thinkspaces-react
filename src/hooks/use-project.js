import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProject, updateProject, createProject, deleteProject } from '../components/app/actions';

export default (pid = null) => {
  const dispatch = useDispatch();
  const project = useSelector(state => state.data.projects[pid]);
  const actions = bindActionCreators(
    { getProject, updateProject, createProject, deleteProject },
    dispatch,
  );

  useEffect(() => {
    if (pid) {
      actions.getProject(pid);
    }
  }, [ pid ]);

  return { project, ...actions };
};
