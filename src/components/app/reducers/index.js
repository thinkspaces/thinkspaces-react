import { combineReducers } from 'redux';

import projects from './project';
import tags from './tag';
import user from './user';

export default () => {
  const data = combineReducers({
    projects,
    tags,
    user,
  });

  const appReducer = combineReducers({
    data,
  });

  const rootReducer = (state, action) => appReducer(state, action);
  return rootReducer;
};
