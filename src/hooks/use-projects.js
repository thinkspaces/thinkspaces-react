import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import selector from '../components/app/selectors';
import { getProjects, getTags } from '../components/app/actions';

const useProjects = (firstRender = false) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getProjects, getTags }, dispatch);
  const projects = useSelector(state => selector(state));

  useEffect(() => {
    if (firstRender) {
      actions.getProjects();
      actions.getTags();
    }
  }, []);

  return projects;
};

export default useProjects;
