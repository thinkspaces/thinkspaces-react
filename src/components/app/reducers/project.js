import { handleActions } from 'redux-actions';

import { createProject, getProjects, getProject, updateProject } from '../actions';

const reducer = handleActions(
  {
    [createProject]: {
      FULFILLED: (state, { payload }) => {
        const id = payload.result;
        const values = payload.entities.projects[id];
        return {
          ...state,
          [id]: { ...state[id], ...values },
        };
      },
    },
    [getProjects]: {
      FULFILLED: (state, { payload }) => ({
        ...state,
        ...payload.entities.projects,
      }),
    },
    [getProject]: {
      FULFILLED: (state, { payload }) => {
        const id = payload.result;
        const values = payload.entities.projects[id];
        return {
          ...state,
          [id]: { ...state[id], ...values },
        };
      },
    },
    [updateProject]: {
      FULFILLED: (state, { payload }) => {
        const id = payload.result;
        const values = payload.entities.projects[id];
        return {
          ...state,
          [id]: { ...state[id], ...values },
        };
      },
    },
  },
  {},
);

export default reducer;
