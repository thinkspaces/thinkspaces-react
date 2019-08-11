import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProject, updateProject } from '../components/app/actions';

const useLoader = (handler) => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleSave = (props) => {
    // start loading
    setSuccess(false);
    setLoading(true);

    // handle callback
    handler(props);

    // stop loading
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return { handleSave, loading, success };
};

const useProject = (pid) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getProject, updateProject }, dispatch);
  const project = useSelector(state => state.data.projects[pid]);

  const saveHandler = values => actions.updateProject({ pid, values });
  const { success, loading, handleSave } = useLoader(saveHandler);
  return { project, success, loading, handleSave };
};

export default useProject;
