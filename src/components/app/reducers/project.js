import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../actions';

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
    [deleteProject]: {
      FULFILLED: (state, { payload }) => omit(state, [ payload.result ]),
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
