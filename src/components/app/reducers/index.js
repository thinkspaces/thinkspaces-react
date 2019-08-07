import { combineReducers } from 'redux';

import projects from './project';
import tags from './tag';

export default () => {
  const data = combineReducers({
    projects,
    tags,
  });

  const appReducer = combineReducers({
    data,
  });

  const rootReducer = (state, action) => appReducer(state, action);
  return rootReducer;
};
