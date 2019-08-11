import { handleActions } from 'redux-actions';

import { getTags, getTag, updateTags } from '../actions';

const reducer = handleActions(
  {
    [getTags]: {
      FULFILLED: (state, { payload }) => ({
        ...state,
        ...payload.entities.tags,
      }),
    },
    [getTag]: {
      FULFILLED: (state, { payload }) => {
        const id = payload.result;
        const values = payload.entities.tags[id];
        return {
          ...state,
          [id]: { ...state[id], ...values },
        };
      },
    },
    // [updateTags]: {
    //   FULFILLED: (state, { payload }) => {
    //     const id = payload.result;
    //     const values = payload.entities.projects[id].tags;
    //     return {
    //       ...state,
    //       [id]: { ...state[id], ...values },
    //     };
    //   },
    // },
  },
  {},
);

export default reducer;
