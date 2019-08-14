import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProject, updateProject } from '../components/app/actions';

export default ({ pid }) => {
  const dispatch = useDispatch();
  const project = useSelector(state => state.data.projects[pid]);
  const actions = bindActionCreators({ getProject, updateProject }, dispatch);

  useEffect(() => {
    actions.getProject(pid);
  }, [ pid ]);

  return { project, ...actions };
};
