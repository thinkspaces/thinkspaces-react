import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import selector from '../components/app/selectors';
import { getProjects, getTags } from '../components/app/actions';

const useProjects = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getProjects, getTags }, dispatch);
  const projects = useSelector(state => selector(state));

  useEffect(() => {
    actions.getProjects();
    actions.getTags();
  }, []);

  return projects;
};

export default useProjects;
