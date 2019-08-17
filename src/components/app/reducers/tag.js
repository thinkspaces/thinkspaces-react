import { handleActions } from 'redux-actions';

import { getTags, getTag } from '../actions';

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
  },
  {},
);

export default reducer;
